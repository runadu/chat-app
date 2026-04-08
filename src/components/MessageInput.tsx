"use client";

import { useState } from "react";
import { addMessage } from "@/features/conversations/conversationsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function MessageInput() {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const activeSessionId = useAppSelector((state) => state.conversations.activeSessionId);

  const handleSend = () => {
    if (!input.trim() || !activeSessionId) return;

    dispatch(
      addMessage({
        sessionId: activeSessionId,
        message: {
          role: "user",
          content: input,
        },
      })
    );

    dispatch(
      addMessage({
        sessionId: activeSessionId,
        message: {
          role: "assistant",
          content: "This is a mock response.",
        },
      })
    );

    setInput("");
  };

  return (
    <div className="flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 rounded border px-4 py-2"
      />
      <button onClick={handleSend} className="rounded bg-black px-4 py-2 text-white">
        Send
      </button>
    </div>
  );
}
