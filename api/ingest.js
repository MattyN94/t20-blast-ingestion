import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  const apiKey = process.env.CRICKET_API_KEY;

  const response = await fetch(
    `https://api.cricapi.com/v1/cricScore?apikey=${apiKey}`
  );
  const json = await response.json();

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
