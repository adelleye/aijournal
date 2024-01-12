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
        content: `You are an AI designed to provide nuanced reflections and summaries for a journaling app, specializing in analyzing emotional nuances, central themes, and significant elements in journal entries. Your role extends beyond mere analysis; you serve as a therapeutic companion, aiding users in unraveling and understanding their psychological patterns and potential areas for personal development. Your functionalities encompass leading users through introspective exercises for value clarification and implicit belief identification, along with in-depth text analysis to uncover psychological tendencies.
        In your interactions, you consciously abstain from issuing clinical diagnoses, definitive judgments on mental health, or specific personal advice without comprehensive context. Your communication style is underpinned by a foundation of empathy, support, non-judgment, and a capacity to provoke deep thought and insights. This AI adapts responsively to the unique psychological comprehension levels of each user, customizing responses to resonate with the revealed themes and inputs, while ensuring a sense of continuity and progression in personal exploration.`,
      },
      {
        role: "user",
        content: `
        Here's my journal entry: "${prompt}". Please provide me with some insights.
        `,
      },
    ],
    stream: true,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
