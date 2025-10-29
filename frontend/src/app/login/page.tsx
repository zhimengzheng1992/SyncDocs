"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function LoginPage() {
  const router = useRouter();
  const login = useUserStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleLogin = () => {
    // Mock user
    const mockUser = {
      id: "user-" + Date.now(),
      name: name || "Anonymous",
      email: email || "user@example.com",
    };

    login(mockUser);
    router.push("/docs");
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-80">
        <h1 className="text-2xl font-semibold text-center mb-6">
          SyncDocs Login
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-md p-2 mb-3 text-sm"
        />

        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-md p-2 mb-4 text-sm"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors"
        >
          Log In
        </button>
      </div>
    </main>
  );
}
