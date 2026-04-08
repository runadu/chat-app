import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversationsState, Message, Session } from "@/types/api";
import { nanoid } from "@reduxjs/toolkit";

const DEFAULT_SESSION_TITLE = "新對話";

const initialState: ConversationsState = {
  sessions: [
    {
      id: "session-1",
      title: DEFAULT_SESSION_TITLE,
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: "msg-1",
          role: "assistant",
          content: "Hello, how can I help you today?",
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ],
  activeSessionId: "session-1",
};

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    createSession: (state) => {
      const session: Session = {
        id: nanoid(),
        title: DEFAULT_SESSION_TITLE,
        messages: [],
        createdAt: new Date().toISOString(),
      };
      state.sessions.unshift(session);
      state.activeSessionId = session.id;
    },

    deleteSession: (state, action: PayloadAction<string>) => {
      state.sessions = state.sessions.filter((s) => s.id !== action.payload);
      if (state.activeSessionId === action.payload) {
        state.activeSessionId = state.sessions[0]?.id ?? null;
      }
    },

    setActiveSession: (state, action: PayloadAction<string>) => {
      state.activeSessionId = action.payload;
    },

    addMessage: (
      state,
      action: PayloadAction<{ sessionId: string; message: Omit<Message, "id" | "createdAt"> }>
    ) => {
      const session = state.sessions.find((s) => s.id === action.payload.sessionId);
      if (!session) return;
      const msg: Message = {
        ...action.payload.message,
        id: nanoid(),
        createdAt: new Date().toISOString(),
      };
      session.messages.push(msg);
      // 自動用第一條 user 訊息當 title
      if (session.title === DEFAULT_SESSION_TITLE && msg.role === "user") {
        session.title = msg.content.slice(0, 30) + (msg.content.length > 30 ? "…" : "");
      }
    },

    updateLastAssistantMessage: (
      state,
      action: PayloadAction<{ sessionId: string; content: string }>
    ) => {
      const session = state.sessions.find((s) => s.id === action.payload.sessionId);
      if (!session) return;
      const lastMessage = session.messages.at(-1);

      if (lastMessage?.role === "assistant") {
        lastMessage.content = action.payload.content;
        return;
      }

      session.messages.push({
        id: nanoid(),
        role: "assistant",
        content: action.payload.content,
        createdAt: new Date().toISOString(),
      });
    },
  },
});

export const {
  createSession,
  deleteSession,
  setActiveSession,
  addMessage,
  updateLastAssistantMessage,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
