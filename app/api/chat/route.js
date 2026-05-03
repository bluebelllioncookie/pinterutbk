export async function POST(req) {
  try {
    const { question } = await req.json();

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          {
            role: "system",
            content:
              "Kamu adalah tutor UTBK yang menjelaskan dengan bahasa sederhana, seperti teman sebaya, pakai contoh sehari-hari.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      }),
    });

    const data = await response.json();

    return Response.json({
      reply:
        data.output?.[0]?.content?.[0]?.text ||
        data.output_text ||
        "Tidak ada jawaban dari AI.",
    });
  } catch (err) {
    return Response.json({
      reply: "Error: " + err.message,
    });
  }
}
