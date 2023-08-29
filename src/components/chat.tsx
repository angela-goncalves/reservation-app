"use client";

import { Button } from "@radix-ui/themes";
import { useChat } from "ai/react";
import * as chrono from "chrono-node";

const example = [
  "Hello!, I would like to request a reservation for tomorrow at 19hs. We will be 4 people. Thank you!",
  "Hi there! I would like to make a reservation at 21:00 on september 29th, for 3 people. Thank you!",
  "Could I please reserve two tables, 'cause we are 6 people, at 20:00 on september 30th? Thank you!",
];

export default function Chat() {
  const { messages, setInput, input, handleInputChange, handleSubmit } =
    useChat();

  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col justify-between p-4 overflow-y-auto">
      {/* <LoginButton /> */}
      {example.map((item: any) => (
        <Button
          className="max-h-[500px]"
          onClick={() => {
            setInput(item);
          }}
          key={item}>
          {item}
        </Button>
      ))}
      <div className="p-2 flex flex-col">
        {messages.length > 0 ? (
          messages.map((item: any) => {
            if (item.role === "user") {
              // const date = chrono.parseDate(item.content);
              // const daytostring = date.toString().split(" ");
              // console.log("daytostring", daytostring);
              // const day = daytostring[0];
              // console.log("day", day);
              return (
                <div key={item.id} className="flex flex-col">
                  <div className="bg-gray-600 shadow-md p-4 rounded-tl-2xl rounded-r-2xl self-end max-w-[240px] w-auto mt-4 text-end text-white">
                    {item.content}
                  </div>
                </div>
              );
            }
            if (item.role === "assistant") {
              return (
                <div
                  key={item.id}
                  className="flex shadow-md rounded-tr-2xl rounded-l-2xl flex-col pr-16 max-w-[240px]">
                  {item.content}
                </div>
              );
            }
          })
        ) : (
          <div className="p-4 text-black">
            Hi! Where would you like to eat today?
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          <input
            className=" w-full max-w-md bottom-0 border border-gray-300 rounded-lg mb-8 text-black shadow-xl p-2"
            value={input}
            placeholder=""
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
