import type { Metadata } from "next";
import "@/styles/globals.css";
import ReduxProvider from "@/app/provider";

export const metadata: Metadata = {
  title: "AI Chat",
  description: "AI chat app built with Next.js + Redux Toolkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
