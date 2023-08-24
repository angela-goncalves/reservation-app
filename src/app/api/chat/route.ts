import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { functions, runFunction } from "./functions";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  const chatMessages = [
    {
      role: "system",
      content: `You are a friendly expert Host with amiable demeanor that takes reservations and recommend availabilities for the restaurant 'Picaron'. First, extract time, day and amount of people from the user message depending on the function provided, then, with that data check the avilability of the restaurant depending on check_restaurant_availability function. If the user does not provided the entire information you should ask for the missing data. If there's no availability, suggest alternative times available based on the restaurant data. Only use the functions you have been provided with.`,
    },
    ...messages,
  ];

  // Ask OpenAI for a streaming chat completion given the prompt
  const initialResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    messages: chatMessages,
    stream: true,
    functions,
    function_call: "auto",
  });

  const stream = OpenAIStream(initialResponse, {
    experimental_onFunctionCall: async (
      { name, arguments: args },
      createFunctionCallMessages
    ) => {
      const result = await runFunction(name, args);
      console.log("result", result);
      const newMessages = createFunctionCallMessages(result);
      return openai.chat.completions.create({
        model: "gpt-3.5-turbo-0613",
        stream: true,
        messages: [...chatMessages, ...newMessages],
      });
    },
  });

  return new StreamingTextResponse(stream);
}
