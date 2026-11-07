import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const modelMessages = convertToModelMessages(messages).map((msg) => {
    if (msg.role === "user" && Array.isArray(msg.content)) {
      return {
        role: msg.role,
        content: msg.content.map((part: any) => {
          if (part.type === "image" && typeof part.image === "string") {
            return {
              type: "image" as const,
              image: part.image,
            }
          }
          return part
        }),
      }
    }
    return msg
  })

  const result = streamText({
    model: "openai/gpt-4o",
    messages: modelMessages,
    system: `You are an expert satellite image analyst. When users upload satellite images, analyze them carefully and provide detailed insights about:
    - Terrain and topography
    - Land use patterns (urban, agricultural, forest, water bodies, etc.)
    - Infrastructure and development
    - Environmental features
    - Any notable patterns or anomalies
    
    Be specific, technical when appropriate, and educational in your responses. If you cannot see an image, politely ask the user to upload one.`,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    consumeSseStream: consumeStream,
  })
}
