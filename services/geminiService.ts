import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let client: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!client) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing from environment variables.");
      // In a real app, handle this more gracefully. For prototype, we might fail hard or return a mock.
    }
    client = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });
  }
  return client;
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; content: string }[]
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Transform history for the chat context if needed, but for simple request/response:
    // We will use the chat model to maintain context
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // Low temperature for high precision and diagnostic consistency
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.content }]
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time. Please try again.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I am currently experiencing technical difficulties. Please check your internet connection or try again later. (Error: Gemini API)";
  }
};