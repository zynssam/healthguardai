import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let client: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!client) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing from environment variables.");
    }
    client = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });
  }
  return client;
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; content: string }[],
  context?: string // New optional parameter for Risk/City context
): Promise<string> => {
  try {
    const ai = getClient();
    
    // If context is provided (e.g., HIGH RISK warning), we prepend it to the user's message
    // This effectively steers the model for this specific turn without altering global history permanently in a weird way
    const effectiveMessage = context ? `[SYSTEM CONTEXT: ${context}] ${message}` : message;

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, 
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.content }]
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({
      message: effectiveMessage
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time. Please try again.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I am currently experiencing technical difficulties. Please check your internet connection or try again later. (Error: Gemini API)";
  }
};
