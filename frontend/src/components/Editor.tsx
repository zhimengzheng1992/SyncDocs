"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useParams } from "next/navigation";
import {
  ySyncPlugin,
  yCursorPlugin,
  yUndoPlugin,
  undo,
  redo,
} from "y-prosemirror";

function randomColor() {
  const colors = [
    "#EF4444",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function Editor() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const [status, setStatus] = useState("connecting");
  const [onlineCount, setOnlineCount] = useState(1);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Loading document...</p>",
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!id || !editor) return;

    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(
      "wss://demos.yjs.dev",
      `syncdocs-${id}`,
      ydoc
    );
    const yXmlFragment = ydoc.getXmlFragment("prosemirror");

    // 监听连接状态
    provider.on("status", (event: { status: string }) => {
      setStatus(event.status);
    });

    // 监听在线人数变化
    const awareness = provider.awareness;
    const updateOnline = () => {
      const states = Array.from(awareness.getStates().values());
      setOnlineCount(states.length);
    };
    awareness.on("update", updateOnline);
    updateOnline();

    // 设置本地用户信息（用户名 + 颜色）
    awareness.setLocalStateField("user", {
      name: `User-${Math.floor(Math.random() * 1000)}`,
      color: randomColor(),
    });

    // TipTap + Yjs 集成
    editor.registerPlugin(ySyncPlugin(yXmlFragment));
    editor.registerPlugin(yCursorPlugin(awareness));
    editor.registerPlugin(yUndoPlugin());

    return () => {
      awareness.off("update", updateOnline);
      provider.disconnect();
      editor.destroy();
    };
  }, [id, editor]);

  if (!editor) {
    return <p className="text-gray-500">Loading editor...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Document ID: {id}</h2>
        <div className="flex gap-4 items-center text-sm">
          <span
            className={`${
              status === "connected" ? "text-green-600" : "text-gray-500"
            }`}
          >
            ● {status}
          </span>
          <span className="text-gray-600">👥 {onlineCount} online</span>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("bold") ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("italic") ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          Italic
        </button>
        <button
          onClick={() => undo(editor.state)}
          className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          Undo
        </button>
        <button
          onClick={() => redo(editor.state)}
          className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          Redo
        </button>
      </div>

      <div className="border rounded-md p-2 min-h-[400px] prose prose-sm max-w-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
