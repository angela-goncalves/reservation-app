"use client";

import { useChat } from "ai/react";
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col justify-between p-4 overflow-y-auto">
      <div className="p-2 flex flex-col">
        {messages.length > 0 ? (
          messages.map((item: any) => {
            if (item.role === "user") {
              return (
                <div key={item.id} className="flex flex-col">
                  <div className="bg-gray-600 shadow-md p-4 rounded-tr-2xl rounded-l-2xl self-end max-w-[240px] w-auto mt-4 text-end text-white">
                    {item.content}
                  </div>
                </div>
              );
            }
            if (item.role === "assistant") {
              return (
                <div key={item.id} className="flex flex-col pr-16 ">
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
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
