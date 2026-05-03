export async function POST(req) {
  const { question } = await req.json();

  let reply = "Coba tanya tentang silogisme, stoikiometri, atau penalaran kuantitatif.";

  const q = (question || "").toLowerCase();

  if (q.includes("silogisme")) {
    reply =
      "Bayangkan silogisme seperti rantai logika. Semua dokter suka belajar. Rani dokter. Berarti Rani suka belajar.";
  } else if (q.includes("stoikiometri")) {
    reply =
      "Stoikiometri mirip resep masak. Kalau tahu jumlah bahan awal dan perbandingannya, kamu bisa hitung hasil akhirnya.";
  } else if (q.includes("kuantitatif")) {
    reply =
      "Untuk penalaran kuantitatif, coba lihat pola dan eliminasi pilihan dulu sebelum menghitung panjang.";
  }

  return Response.json({ reply });
}
