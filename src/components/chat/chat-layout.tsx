"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import ChatWindow from "./chat-window";

export default function ChatLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh bg-white">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <ChatWindow onOpenSidebar={() => setIsSidebarOpen(true)} />
    </div>
  );
}
