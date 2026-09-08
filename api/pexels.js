export default async function handler(req, res) {
  const query = req.query.query || "photography";

  if (!process.env.PEXELS_API_KEY) {
    return res.status(500).json({
      error: "PEXELS_API_KEY is missing",
    });
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        query
      )}&per_page=6`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Pexels request failed",
        status: response.status,
      });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Pexels API error:", error);

    res.status(500).json({
      error: "Unable to load photography inspiration.",
    });
  }
}