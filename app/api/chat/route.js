export async function POST(req) {
  try {
    const { question } = await req.json();

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
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
                    "Kamu tutor UTBK yang menjelaskan sederhana seperti teman sebaya. Jelaskan dengan contoh sehari-hari.\n\nPertanyaan: " +
                    question,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI tidak memberi jawaban.";

    return Response.json({ reply });
  } catch (err) {
    return Response.json({
      reply: "Error: " + err.message,
    });
  }
}
