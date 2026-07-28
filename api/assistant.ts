import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Routes
app.post("/api/assistant", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemInstruction = `You are CampusMesh AI, an intelligent emergency and campus support assistant running on a decentralized university mesh network. You provide concise, reliable first-aid guidance, offline campus navigation tips, emergency response protocols, and mesh network diagnostics. Keep answers calm, direct, bulleted when applicable, and easy to read on mobile devices.`;

    const contents = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history) {
        contents.push({
          role: item.role === "assistant" ? "model" : "user",
          parts: [{ text: item.text }],
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text || "CampusMesh AI is standing by to assist." });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(200).json({
      reply: "Offline Protocol Advisory: If you are experiencing a medical or life-threatening emergency, tap 'Broadcast to Mesh Network' or call Campus Safety immediately. Follow glowing green emergency exit signs along main corridors.",
    });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", meshNodes: 14 });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
