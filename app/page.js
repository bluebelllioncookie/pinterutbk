// FULL-STACK STARTER (Next.js + Supabase + OpenAI-ready)
// File: app/page.js

"use client";

import { useState } from "react";

export default function Page() {
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("Tanya materi UTBK apa pun.");

  async function askAI() {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">UTBK SNBT Study Hub</h1>

        <div className="rounded-2xl bg-slate-900 p-5 space-y-4">
          <h2 className="text-2xl font-semibold">AI Tutor Aktif</h2>
          <p>{reply}</p>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full rounded-xl px-3 py-2 bg-slate-800"
            placeholder="Contoh: jelaskan silogisme"
          />
          <button onClick={askAI} className="px-4 py-2 rounded-xl bg-indigo-600">
            Tanya
          </button>
        </div>
      </div>
    </main>
  );
}

// File: app/api/chat/route.js
// import OpenAI from "openai";
// export async function POST(req) {
//   const { question } = await req.json();
//   return Response.json({
//     reply: `Contoh jawaban backend aktif untuk: ${question}`,
//   });
// }

// NEXT STEPS
// - Supabase auth
// - question bank table
// - leaderboard table
// - tryout analytics
