export type Role = "user" | "assistant";

export interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: string;
}

export interface Session {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

export interface ConversationsState {
  sessions: Session[];
  activeSessionId: string | null;
}
