import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

// Allow responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Menggunakan API key dan endpoint dari variabel lingkungan untuk keamanan.
  // Pastikan LAOZHANG_API_KEY dan LAOZHANG_API_ENDPOINT diatur di Project Settings -> Environment Variables Vercel Anda.
  const LAOZHANG_API_KEY = process.env.LAOZHANG_API_KEY
  const LAOZHANG_API_ENDPOINT = process.env.LAOZHANG_API_ENDPOINT
  const MODEL_NAME = "gpt-4o-mini"

  // Log untuk debugging: Periksa apakah variabel lingkungan terdeteksi
  console.log("LAOZHANG_API_KEY:", LAOZHANG_API_KEY ? "Configured" : "NOT CONFIGURED")
  console.log("LAOZHANG_API_ENDPOINT:", LAOZHANG_API_ENDPOINT ? "Configured" : "NOT CONFIGURED")

  if (!LAOZHANG_API_KEY || !LAOZHANG_API_ENDPOINT) {
    const errorMessage = "Server configuration error: LAOZHANG_API_KEY or LAOZHANG_API_ENDPOINT is missing."
    console.error(errorMessage)
    return new Response(errorMessage, {
      status: 500,
      statusText: errorMessage,
    })
  }

  // Tambahkan system message baru untuk mendefinisikan persona AI
  const systemMessage = {
    role: "system",
    content:
      "You are a professional Web3 and crypto enthusiast named SKIMASK COSMO AI. You are highly knowledgeable about strategies, market analysis, blockchain technology, DeFi, NFTs, AI, and everything related to the Web3 and AI world. Provide informative, accurate, simple, and clear answers. Always respond in English. Do not use any markdown formatting like bolding (**).",
  }

  // Gabungkan system message dengan pesan dari pengguna
  const messagesWithSystem = [systemMessage, ...messages]

  try {
    const result = await streamText({
      model: openai(MODEL_NAME, {
        baseURL: LAOZHANG_API_ENDPOINT,
        apiKey: LAOZHANG_API_KEY,
      }),
      messages: messagesWithSystem,
    })

    return result.toDataStreamResponse()
  } catch (error: any) {
    // Log error yang lebih detail
    console.error("Error in AI stream processing:", error)
    console.error("Error name:", error.name)
    console.error("Error message:", error.message)
    if (error.cause) {
      console.error("Error cause:", error.cause)
    }

    const errorMessage = `Failed to get a response from SKIMASK COSMO AI (Laozhang AI): ${error.message || "Unknown error occurred during AI processing."}`
    return new Response(errorMessage, {
      status: 500,
      statusText: errorMessage,
    })
  }
}
