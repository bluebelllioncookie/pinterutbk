export async function POST(req) {
  try {
    const { question } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah tutor UTBK yang menjelaskan seperti teman sebaya. Gunakan bahasa Indonesia yang mudah dipahami, singkat, akurat, dan kalau cocok beri permisalan sederhana.",
          },
          {
            role: "user",
            content: question,
          },
        ],
        temperature: 0.6,
      }),
    });

    const data = await response.json();

    const reply =
      data.choices?.[0]?.message?.content ||
      "Maaf, jawaban AI belum tersedia.";

    return Response.json({ reply });
  } catch (error) {
    return Response.json({
      reply: "Terjadi error saat menghubungi AI tutor.",
    });
  }
}
