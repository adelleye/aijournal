import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
// /api/completion
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  // extract the prompt from the body
  const { prompt } = await req.json();

  const response = await openai.createChatCompletion({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: `You are an AI designed to provide reflective insights and summaries for a journaling app. Analyze the user's journal entry, considering emotional tone, key themes, and any notable points. Provide a summary that offers the user a deeper understanding of their thoughts and feelings. Be empathetic, insightful, and respectful in your analysis.`,
      },
      {
        role: "user",
        content: `
        Here's my journal entry: "${prompt}". Please provide me with some insights and a summary.
        `,
      },
    ],
    stream: true,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
