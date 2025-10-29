"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDocs, createDoc, Doc } from "@/api/mockDocs";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DocsPage() {
  const user = useUserStore((s) => s.user);
  const router = useRouter();
  const queryClient = useQueryClient();

  // 没登录则跳回 login
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  const { data: docs, isLoading } = useQuery<Doc[]>({
    queryKey: ["docs"],
    queryFn: fetchDocs,
  });

  const mutation = useMutation({
    mutationFn: createDoc,
    onSuccess: (newDoc) => {
      queryClient.invalidateQueries({ queryKey: ["docs"] });
      router.push(`/docs/${newDoc.id}`);
    },
  });

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Documents</h1>
        <button
          onClick={() => mutation.mutate("New Document")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          + New Document
        </button>
      </header>

      {isLoading ? (
        <p className="text-gray-500">Loading documents...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {docs?.map((doc) => (
            <div
              key={doc.id}
              onClick={() => router.push(`/docs/${doc.id}`)}
              className="cursor-pointer bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="font-medium text-lg mb-1">{doc.title}</h2>
              <p className="text-sm text-gray-500">
                Last updated: {doc.updatedAt}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
