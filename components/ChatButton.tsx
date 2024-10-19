"use client";
import React, { useState } from "react";
import { ChatInterface } from "./ChatInterface"; // Import your ChatInterface

export const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleChat} className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition">
        Chat
      </button>
      {isOpen && <ChatInterface />}
    </>
  );
};
