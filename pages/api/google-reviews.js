export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    res.status(500).json({ error: 'Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID in environment' });
    return;
  }

  try {
    const params = new URLSearchParams({
      place_id: placeId,
      fields: 'rating,user_ratings_total,reviews',
      key: apiKey,
    });

    const url = `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`;
    const resp = await fetch(url);
    if (!resp.ok) {
      const text = await resp.text();
      res.status(resp.status).json({ error: 'Upstream error', detail: text });
      return;
    }
    const data = await resp.json();

    if (data.status !== 'OK') {
      res.status(502).json({ error: 'Places API error', detail: data.status, message: data.error_message });
      return;
    }

    const details = data.result || {};
    const reviews = Array.isArray(details.reviews) ? details.reviews : [];

    // Normalize and limit to 30 reviews
    const normalized = reviews.slice(0, 5).map((r) => ({
      author_name: r.author_name,
      author_url: r.author_url,
      profile_photo_url: r.profile_photo_url,
      rating: r.rating,
      relative_time_description: r.relative_time_description,
      text: r.text,
      time: r.time,
      language: r.language,
    }));

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json({
      rating: details.rating,
      user_ratings_total: details.user_ratings_total,
      reviews: normalized,
    });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected error', detail: String(err) });
  }
}
