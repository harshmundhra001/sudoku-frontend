import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Game",
  description: "Generate new game",
};

export default function CreateGameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center m-2">
      {children}
    </div>
  );
}
