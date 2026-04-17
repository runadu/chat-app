"use client";

import { createSession, setActiveSession } from "@/features/conversations/conversationsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const dispatch = useAppDispatch();
  const { sessions, activeSessionId } = useAppSelector((state) => state.conversations);

  const handleCreateSession = () => {
    dispatch(createSession());
    onClose();
  };

  const handleSelectSession = (sessionId: string) => {
    dispatch(setActiveSession(sessionId));
    onClose();
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close conversation list"
        aria-hidden={!isOpen}
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity md:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(18rem,85vw)] flex-col border-r border-gray-200 bg-gray-50 p-4 shadow-xl transition-transform duration-200 md:static md:z-auto md:w-72 md:translate-x-0 md:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between gap-3 md:block">
          <button
            onClick={handleCreateSession}
            className="w-full rounded bg-black px-4 py-2 text-sm font-medium text-white"
          >
            New Chat
          </button>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded border border-gray-300 bg-white px-3 py-2 text-sm md:hidden"
          >
            Close
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => handleSelectSession(session.id)}
              className={`w-full rounded px-3 py-2 text-left text-sm transition-colors ${
                activeSessionId === session.id
                  ? "bg-gray-200 text-black"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="block truncate">{session.title}</span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
