"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  createSession,
  deleteSession,
  renameSession,
  setActiveSession,
} from "@/features/conversations/conversationsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { sessions, activeSessionId } = useAppSelector((state) => state.conversations);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const renameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!editingSessionId) return;

    renameInputRef.current?.focus();
    renameInputRef.current?.select();
  }, [editingSessionId]);

  const handleStartRename = (sessionId: string, title: string) => {
    setEditingSessionId(sessionId);
    setDraftTitle(title);
  };

  const handleCancelRename = () => {
    setEditingSessionId(null);
    setDraftTitle("");
  };

  const handleCommitRename = (sessionId: string, currentTitle: string) => {
    const nextTitle = draftTitle.trim() || currentTitle;

    if (nextTitle !== currentTitle) {
      dispatch(renameSession({ sessionId, title: nextTitle }));
    }

    handleCancelRename();
  };

  const handleRenameKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    sessionId: string,
    currentTitle: string
  ) => {
    if (event.key === "Enter") {
      handleCommitRename(sessionId, currentTitle);
      return;
    }

    if (event.key === "Escape") {
      handleCancelRename();
    }
  };

  const handleDeleteSession = (sessionId: string) => {
    const shouldDelete = window.confirm("Delete this conversation?");
    if (!shouldDelete) return;

    if (editingSessionId === sessionId) {
      handleCancelRename();
    }

    dispatch(deleteSession(sessionId));
  };

  return (
    <aside className="w-64 border-r bg-gray-50 p-4">
      <button
        type="button"
        onClick={() => dispatch(createSession())}
        className="mb-4 w-full rounded bg-black px-4 py-2 text-white"
      >
        New Chat
      </button>

      <div className="space-y-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`w-full rounded px-3 py-2 text-left ${
              activeSessionId === session.id ? "bg-gray-200" : "bg-white"
            }`}
          >
            {editingSessionId === session.id ? (
              <input
                ref={renameInputRef}
                value={draftTitle}
                onChange={(event) => setDraftTitle(event.target.value)}
                onBlur={() => handleCommitRename(session.id, session.title)}
                onKeyDown={(event) => handleRenameKeyDown(event, session.id, session.title)}
                className="mb-2 w-full rounded border bg-white px-2 py-1 text-sm"
              />
            ) : (
              <button
                type="button"
                onClick={() => dispatch(setActiveSession(session.id))}
                className="mb-2 block w-full truncate text-left text-sm font-medium"
              >
                {session.title}
              </button>
            )}

            <div className="flex gap-2 text-xs">
              {editingSessionId === session.id ? (
                <>
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleCommitRename(session.id, session.title)}
                    className="rounded border px-2 py-1"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={handleCancelRename}
                    className="rounded border px-2 py-1"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => handleStartRename(session.id, session.title)}
                  className="rounded border px-2 py-1"
                >
                  Rename
                </button>
              )}

              <button
                type="button"
                onClick={() => handleDeleteSession(session.id)}
                className="rounded border border-red-200 px-2 py-1 text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
