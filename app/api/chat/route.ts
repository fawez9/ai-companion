import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { NextResponse } from "next/server";

// Initialize the LLM with Gemini
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash", // Specify the desired model
  apiKey: process.env.GEMINI_API_KEY, // Set your Gemini API key in the .env file
  temperature: 0.4, // Adjust temperature for response randomness
});

// Initialize chat history
const chatHistory: Array<{ role: string; content: string }> = [];

export async function POST(req: Request) {
  const { message } = await req.json();

  // Add the user's message to chat history
  chatHistory.push({ role: "user", content: message });

  try {
    // Generate AI response
    const aiResponse = await llm.invoke(chatHistory);

    // Add the AI's response to chat history
    chatHistory.push({ role: "assistant", content: JSON.stringify(aiResponse.content) });

    // Return the AI response
    return NextResponse.json({ aiResponse: aiResponse.content });
  } catch (error) {
    console.error("Error processing message:", error);
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
  }
}
