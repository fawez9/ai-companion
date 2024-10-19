"use client";
import React, { useState } from "react";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
};

export const ChatInterface = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Clear input
    setInput("");

    // Send message to API and get AI response
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();

      // Add AI message to the chat
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.aiResponse,
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto bg-gray-50 shadow-lg rounded-lg">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`p-4 rounded-lg ${message.isUser ? "bg-blue-500 text-white ml-auto" : "bg-gray-200"} max-w-[80%]`}>
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type your message..." />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
