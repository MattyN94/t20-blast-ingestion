export default async function handler(req, res) {
  const apiKey = process.env.CRICKET_API_KEY;

  const response = await fetch(
    `https://api.cricapi.com/v1/cricScore?apikey=${apiKey}`
  );
  const json = await response.json();

  console.log("API key present:", !!apiKey);
  console.log("API response:", json);

  for (const match of json.data) {
    if (!match.series?.includes("Vitality")) continue;

    await supabase.from("matches").upsert({
      match_id: match.id,
      venue: match.venue,
      series: match.series
    });
  }

  res.status(200).json({ status: "ok" });
}
