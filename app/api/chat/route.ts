import { streamText } from "ai"
import { openai } from "@ai-sdk/openai" // Import provider OpenAI

// Allow responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Menggunakan API key dan endpoint baru dari laozhang.ai
  // IMPORTANT: For v0 preview, the API key is hardcoded for demonstration.
  // In a real deployment, ALWAYS use environment variables for security.
  // For Vercel deployments, set LAOZHANG_API_KEY in Project Settings -> Environment Variables.
  const LAOZHANG_API_KEY = "sk-qnlW3UaGEFICK1PqD032Ed876aCc469bB5C402Fc82B5A2B0"
  const LAOZHANG_API_ENDPOINT = "https://api.laozhang.ai/v1/chat/completions"
  const MODEL_NAME = "gpt-4o-mini"

  // --- DEBUGGING LOGS AWAL ---
  console.log("DEBUG: LAOZHANG_API_KEY (hardcoded value):", LAOZHANG_API_KEY ? "Set" : "Not Set")
  console.log("DEBUG: LAOZHANG_API_ENDPOINT (hardcoded value):", LAOZHANG_API_ENDPOINT ? "Set" : "Not Set")
  console.log("DEBUG: MODEL_NAME:", MODEL_NAME)
  // --- END DEBUGGING LOGS AWAL ---

  if (!LAOZHANG_API_KEY || !LAOZHANG_API_ENDPOINT) {
    const errorMessage = "Server configuration error: LAOZHANG_API_KEY or LAOZHANG_API_ENDPOINT is missing."
    console.error(errorMessage)
    return new Response(errorMessage, {
      status: 500,
      statusText: errorMessage,
    })
  }

  // Inisialisasi model OpenAI dengan baseURL kustom untuk Laozhang AI
  const laozhangModel = openai(MODEL_NAME, {
    baseURL: LAOZHANG_API_ENDPOINT,
    apiKey: LAOZHANG_API_KEY,
  })

  // Tambahkan system message baru untuk mendefinisikan persona AI
  const systemMessage = {
    role: "system",
    content:
      "You are a professional Web3 and crypto enthusiast named SKIMASK COSMO AI. You are highly knowledgeable about strategies, market analysis, blockchain technology, DeFi, NFTs, AI, and everything related to the Web3 and AI world. Provide informative, accurate, simple, and clear answers. Always respond in English. Do not use any markdown formatting like bolding (**).",
  }

  const messagesToSend = [systemMessage, ...messages]
  console.log("DEBUG: Messages being sent to AI:", JSON.stringify(messagesToSend, null, 2)) // Log pesan yang dikirim

  try {
    console.log("DEBUG: Attempting to stream text from Laozhang AI...")
    const result = await streamText({
      model: laozhangModel,
      messages: messagesToSend,
    })

    // --- DEBUGGING LOGS BARU ---
    console.log("DEBUG: streamText call completed. Result object (partial):", {
      text: result.text ? "Stream available" : "No stream", // Cek apakah ada stream teks
      usage: result.usage, // Informasi penggunaan token
      finishReason: result.finishReason, // Alasan selesai (misal: "stop", "length")
    })
    // --- END DEBUGGING LOGS BARU ---

    // Menggunakan toDataStreamResponse() untuk memformat stream agar kompatibel dengan useChat
    return result.toDataStreamResponse()
  } catch (error: any) {
    // --- ENHANCED ERROR LOGGING ---
    console.error("Error in AI stream processing:")
    console.error("Error Name:", error.name)
    console.error("Error Message:", error.message)
    if (error.stack) {
      console.error("Error Stack:", error.stack)
    }
    if (error.cause) {
      console.error("Error Cause:", error.cause)
    }
    // --- END ENHANCED ERROR LOGGING ---

    const errorMessage = `Failed to get a response from SKIMASK COSMO AI (Laozhang AI): ${error.message || "Unknown error occurred during AI processing."}`
    return new Response(errorMessage, {
      status: 500,
      statusText: errorMessage,
    })
  }
}
