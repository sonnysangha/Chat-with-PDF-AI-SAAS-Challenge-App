"use server";
import { generateEmbeddingsInPineconeVectorStore } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { revalidatePath } from "next/cache";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";

export async function generateEmbeddings(
  docId: string,
  openApiKey?: string,
  isGemini?: boolean
) {
  auth().protect(); // Protect this route with Clerk

  //   turn a PDF into embeddings [0.0123234, 0.234234, ...]
  const { embeddings, model } = await getOpenAiModel(openApiKey, isGemini);
  await generateEmbeddingsInPineconeVectorStore(docId, model, embeddings);

  revalidatePath("/dashboard");

  return { completed: true };
}

export async function getOpenAiModel(openApiKey?: string, isGemini?: boolean) {
  let model;
  let embeddings;
  if (isGemini) {
    model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      modelName: "gemini-1.5-pro",
      maxOutputTokens: 2048,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ],
    });
    embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      modelName: "embedding-001",
    });
  }
  if (openApiKey) {
    model = new ChatOpenAI({
      apiKey: openApiKey,
      modelName: "gpt-4o",
    });
    embeddings = new OpenAIEmbeddings({
      apiKey: openApiKey,
    });
  } else {
    model = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-4o",
    });
    embeddings = new OpenAIEmbeddings();
  }
  return { model, embeddings };
}
