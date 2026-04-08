"use client";

import { useAppSelector } from "@/lib/hooks";
import MessageList from "./message-list";
import MessageInput from "./message-input";

export default function ChatWindow() {
  const { sessions, activeSessionId } = useAppSelector((state) => state.conversations);

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  return (
    <main className="flex flex-1 flex-col">
      <div className="border-b p-4 text-lg font-semibold">
        {activeSession?.title || "No session selected"}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={activeSession?.messages || []} />
      </div>

      <div className="border-t p-4">
        <MessageInput />
      </div>
    </main>
  );
}
