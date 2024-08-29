// app/_components/ConfigForm.tsx
// new file
"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CogIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConfigStore } from "@/components/stores/useConfig";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function ConfigForm() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isGemini, setIsGemini, openAiKey, setOpenAIKey] = useConfigStore(
    (state) => [
      state.isGemini,
      state.setIsGemini,
      state.openAIKey,
      state.setOpenAIKey,
    ]
  );

  const FormSchema = z.object({
    isGemini: z.boolean().default(false),
    isCustomApiKey: z.boolean().default(false),
    isServiceApiKey: z.boolean().default(false),
    openAPIKey: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isGemini: false,
      isCustomApiKey: false,
      isServiceApiKey: false,
      openAPIKey: "",
    },
  });

  useEffect(() => {
    if (isGemini) {
      form.reset({
        isGemini: true,
        isCustomApiKey: false,
        isServiceApiKey: false,
        openAPIKey: "",
      });
    } else {
      if (openAiKey) {
        form.reset({
          isGemini: false,
          isCustomApiKey: true,
          isServiceApiKey: false,
          openAPIKey: "**********",
        });
      } else {
        form.reset({
          isGemini: false,
          isCustomApiKey: false,
          isServiceApiKey: true,
          openAPIKey: "",
        });
      }
    }
  }, [isGemini, openAiKey]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.isGemini) {
      setIsGemini(data.isGemini);
      toast({
        title: "Success",
        description: <p>You have selected using Gemini model.</p>,
      });
      setSheetOpen(false);
      return;
    }
    if (data.isCustomApiKey && data.openAPIKey) {
      setOpenAIKey(data.openAPIKey);
      toast({
        title: "Success",
        description: <p>You have selected using your own OpenAI key.</p>,
      });
      setSheetOpen(false);
      return;
    } else {
      setOpenAIKey("");
      toast({
        title: data.isCustomApiKey ? "Failed" : "Success",
        description: (
          <p>
            {data.isCustomApiKey
              ? "You didn't fill your own OpenAI key, so the system will run with our service key."
              : "You have selected using our service key."}
          </p>
        ),
      });
      setSheetOpen(false);
      return;
    }
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger>
        <div
          className={cn(
            buttonVariants({ size: "icon" }),
            `fixed right-0 top-1/3 lg:top-1/4 rounded-none rounded-l-lg bg-blue-500 p-2 text-white z-20`
          )}
        >
          <CogIcon className="size-10 animate-spin-slow" />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Chat to PDF Powered by OpenAI</SheetTitle>
          <SheetDescription>
            Chat to PDF leverages the capabilities of OpenAI to bring you
            cutting-edge features.
          </SheetDescription>
        </SheetHeader>
        <div className="flex grow flex-col">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <div className="mt-5 border-t pt-5">
                <h3 className="mb-4 text-sm font-medium">
                  You have two options to access our services:
                </h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="isGemini"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Use Gemini Model</FormLabel>
                          <FormDescription>
                            Access our features with daily limitations and quota
                            limits. (Gemini Model)
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              if (checked === true)
                                form.setValue("isCustomApiKey", false);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {form.watch("isGemini") === false && (
                    <>
                      <FormField
                        control={form.control}
                        name="isServiceApiKey"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Use our service key.</FormLabel>
                              <FormDescription>
                                Access our features with daily limitations and
                                quota limits.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                  field.onChange(checked);
                                  if (checked === true)
                                    form.setValue("isCustomApiKey", false);
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="isCustomApiKey"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Use your own OpenAI key</FormLabel>
                              <FormDescription>
                                Enjoy our features for free without any messages
                                limitations.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                  field.onChange(checked);
                                  if (checked === true)
                                    form.setValue("isServiceApiKey", false);
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      {form.watch("isCustomApiKey") === true && (
                        <FormField
                          control={form.control}
                          name="openAPIKey"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Open AI Key</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder=""
                                  {...field}
                                  type={openAiKey ? "password" : "text"}
                                />
                              </FormControl>
                              <FormDescription>
                                You can generate your own Open AI Key at
                                <a href="https://platform.openai.com/api-keys">
                                  https://platform.openai.com/api-keys
                                </a>
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>

              <p className="text-xs text-rose-500">
                Rest assured, we do not store any of your information. All data
                related to your OpenAI key will be removed upon navigation.
              </p>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ConfigForm;
