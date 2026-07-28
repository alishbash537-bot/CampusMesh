import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const SYSTEM_INSTRUCTION = `You are CampusMesh AI, an intelligent emergency and campus support assistant running on a decentralized university mesh network. You provide concise, reliable first-aid guidance, offline campus navigation tips, emergency response protocols, and mesh network diagnostics. Keep answers calm, direct, bulleted when applicable, and easy to read on mobile devices.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history } = req.body ?? {};
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const contents: { role: string; parts: { text: string }[] }[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history) {
        contents.push({
          role: item.role === "assistant" ? "model" : "user",
          parts: [{ text: item.text }],
        });
      }
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return res.status(200).json({
      reply: response.text || "CampusMesh AI is standing by to assist.",
    });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    return res.status(200).json({
      reply:
        "Offline Protocol Advisory: If you are experiencing a medical or life-threatening emergency, tap 'Broadcast to Mesh Network' or call Campus Safety immediately. Follow glowing green emergency exit signs along main corridors.",
    });
  }
} 
