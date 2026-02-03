import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  try {
    const apiKey = process.env.CRICKET_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "CRICKET_API_KEY missing" });
    }

    const response = await fetch(
      `https://api.cricapi.com/v1/cricScore?apikey=${apiKey}`
    );

    const json = await response.json();

    // 🔍 DEBUG OUTPUT
    return res.status(200).json({
      apiKeyPresent: true,
      apiStatus: json.status,
      keys: Object.keys(json),
      sample: json.data?.[0] ?? null
    });

  } catch (error) {
    return res.status(500).json({
      error: "Function crashed",
      message: error.message
    });
  }
}
