"use client";

import { useAppSelector } from "@/lib/hooks";
import MessageList from "./message-list";
import MessageInput from "./message-input";

interface ChatWindowProps {
  onOpenSidebar: () => void;
}

export default function ChatWindow({ onOpenSidebar }: ChatWindowProps) {
  const { sessions, activeSessionId } = useAppSelector((state) => state.conversations);

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 sm:px-5">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="rounded border border-gray-300 px-3 py-2 text-sm md:hidden"
        >
          Menu
        </button>

        <div className="min-w-0 text-base font-semibold sm:text-lg">
          <span className="block truncate">{activeSession?.title || "No session selected"}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
        <MessageList messages={activeSession?.messages || []} />
      </div>

      <div className="border-t border-gray-200 px-4 py-3 sm:px-5">
        <MessageInput />
      </div>
    </main>
  );
}
