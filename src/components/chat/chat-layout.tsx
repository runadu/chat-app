"use client";

import Sidebar from "./sidebar";
import ChatWindow from "./chat-window";

export default function ChatLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}
