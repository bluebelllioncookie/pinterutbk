export async function POST(req) {
  try {
    const { question } = await req.json();

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
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
                    "Kamu tutor UTBK yang menjelaskan sederhana seperti teman sebaya dengan contoh sehari-hari.\n\nPertanyaan: " +
                    question,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json({
        reply: "GEMINI ERROR: " + JSON.stringify(data),
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return Response.json({
      reply: reply || "AI tidak mengembalikan jawaban.",
    });
  } catch (err) {
    return Response.json({
      reply: "SERVER ERROR: " + err.message,
    });
  }
}
