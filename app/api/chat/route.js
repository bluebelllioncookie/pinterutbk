export async function POST(req) {
  try {
    const { question } = await req.json();

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
      process.env.GEMINI_API_KEY;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text:
                  "Kamu tutor UTBK yang menjelaskan dengan sederhana seperti teman sebaya.\n\nPertanyaan: " +
                  question,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    // 🔍 DEBUG kalau gagal
    if (!response.ok) {
      return Response.json({
        reply: "GEMINI ERROR: " + JSON.stringify(data),
      });
    }

    // ✅ ambil response dengan aman
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return Response.json({
      reply: reply || "AI tidak mengembalikan teks jawaban.",
    });
  } catch (err) {
    return Response.json({
      reply: "SERVER ERROR: " + err.message,
    });
  }
}
