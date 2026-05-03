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
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah tutor UTBK yang menjelaskan seperti teman sebaya, ringkas, jelas, dan mudah dipahami.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json({
        reply: `OpenAI error: ${data.error?.message || "unknown error"}`,
      });
    }

    return Response.json({
      reply: data.choices?.[0]?.message?.content || "Tidak ada jawaban.",
    });
  } catch (error) {
    return Response.json({
      reply: `Server error: ${error.message}`,
    });
  }
}
