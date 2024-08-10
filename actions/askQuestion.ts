"use server";

import { Message } from "@/components/Chat";
import { adminDb } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import { getOpenAiModel } from "./generateEmbeddings";
import { generateLangchainCompletion } from "@/lib/langchain";

const PRO_LIMIT = 20;
const FREE_LIMIT = 2;

export async function askQuestion({
  id,
  question,
  openApiKey,
  isGemini,
}: {
  id: string;
  question: string;
  openApiKey?: string;
  isGemini?: boolean;
}) {
  auth().protect();
  const { userId } = await auth();

  const chatRef = adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(id)
    .collection("chat");

  // check how many user messages are in the chat
  const chatSnapshot = await chatRef.get();
  const userMessages = chatSnapshot.docs.filter(
    (doc) => doc.data().role === "human"
  );

  //   Check membership limits for messages in a document
  const userRef = await adminDb.collection("users").doc(userId!).get();

  console.log("DEBUG 2", userRef.data());

  //   check if user is on FREE plan and has asked more than the FREE number of questions
  if (!userRef.data()?.hasActiveMembership) {
    console.log("Debug 3", userMessages.length, FREE_LIMIT);
    if (userMessages.length >= FREE_LIMIT) {
      return {
        success: false,
        message: `You'll need to upgrade to PRO to ask more than ${FREE_LIMIT} questions! 😢`,
      };
    }
  }

  // check if user is on PRO plan and has asked more than 100 questions
  if (userRef.data()?.hasActiveMembership) {
    console.log("Debug 4", userMessages.length, PRO_LIMIT);
    if (userMessages.length >= PRO_LIMIT) {
      return {
        success: false,
        message: `You've reached the PRO limit of ${PRO_LIMIT} questions per document! 😢`,
      };
    }
  }

  const userMessage: Message = {
    role: "human",
    message: question,
    createdAt: new Date(),
  };

  await chatRef.add(userMessage);

  //   Generate AI Response
  const { embeddings, model } = await getOpenAiModel(openApiKey, isGemini);
  const reply = await generateLangchainCompletion(
    id,
    question,
    model,
    embeddings
  );

  const aiMessage: Message = {
    role: "ai",
    message: reply,
    createdAt: new Date(),
  };

  await chatRef.add(aiMessage);

  return { success: true, message: null };
}
