export interface Doc {
  id: string;
  title: string;
  updatedAt: string;
}

let docs: Doc[] = [
  { id: "doc1", title: "Project Plan", updatedAt: "2025-10-28" },
  { id: "doc2", title: "Meeting Notes", updatedAt: "2025-10-27" },
  { id: "doc3", title: "Design Draft", updatedAt: "2025-10-25" },
];

export const fetchDocs = async (): Promise<Doc[]> => {
  // 模拟网络延迟
  await new Promise((r) => setTimeout(r, 400));
  return docs;
};

export const createDoc = async (title: string): Promise<Doc> => {
  const newDoc = {
    id: "doc-" + Date.now(),
    title: title || "Untitled Document",
    updatedAt: new Date().toISOString().split("T")[0],
  };
  docs = [newDoc, ...docs];
  return newDoc;
};
