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
              "Kamu adalah tutor UTBK. Jelaskan dengan sederhana seperti guru les, pakai contoh sehari-hari.",
          },
          {
            role: "user",
            content: question,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    // DEBUG kalau error
    if (!response.ok) {
      return Response.json({
        reply: "ERROR OPENAI: " + JSON.stringify(data),
      });
    }

    return Response.json({
      reply:
        data.choices?.[0]?.message?.content ||
        "AI tidak mengembalikan jawaban.",
    });

  } catch (err) {
    return Response.json({
      reply: "SERVER ERROR: " + err.message,
    });
  }
}
