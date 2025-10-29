"use client";

import Editor from "@/components/Editor";
import { useParams } from "next/navigation";

export default function DocDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Editing Document: {id}</h1>
      <Editor />
    </main>
  );
}
