"use client";

import { createSession, setActiveSession } from "@/features/conversations/conversationsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { sessions, activeSessionId } = useAppSelector((state) => state.conversations);

  return (
    <aside className="w-64 border-r bg-gray-50 p-4">
      <button
        onClick={() => dispatch(createSession())}
        className="mb-4 w-full rounded bg-black px-4 py-2 text-white"
      >
        New Chat
      </button>

      <div className="space-y-2">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => dispatch(setActiveSession(session.id))}
            className={`w-full rounded px-3 py-2 text-left ${
              activeSessionId === session.id ? "bg-gray-200" : "bg-white"
            }`}
          >
            {session.title}
          </button>
        ))}
      </div>
    </aside>
  );
}
