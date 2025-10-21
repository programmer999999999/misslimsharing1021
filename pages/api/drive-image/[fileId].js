export default async function handler(req, res) {
  res.status(410).send('Google Drive image API disabled');
  return;
  const { fileId } = req.query;
  const apiKey = process.env.GDRIVE_API_KEY;
  if (!fileId) {
    res.status(400).send('Missing fileId');
    return;
  }
  if (!apiKey) {
    res.status(500).send('Missing GDRIVE_API_KEY');
    return;
  }
  try {
    const metaUrl = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?fields=id,mimeType,shortcutDetails/targetId&supportsAllDrives=true&key=${apiKey}`;
    const metaResp = await fetch(metaUrl, { cache: 'no-store' });
    if (!metaResp.ok) {
      const text = await metaResp.text();
      res.status(metaResp.status).send(text || 'Failed to fetch metadata');
      return;
    }
    const meta = await metaResp.json();
    let effectiveId = meta.id;
    if (meta.mimeType === 'application/vnd.google-apps.shortcut' && meta.shortcutDetails && meta.shortcutDetails.targetId) {
      effectiveId = meta.shortcutDetails.targetId;
    }
    const url = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(effectiveId)}?alt=media&supportsAllDrives=true&key=${apiKey}`;
    const upstream = await fetch(url, { cache: 'no-store' });
    if (!upstream.ok) {
      const text = await upstream.text();
      res.status(upstream.status).send(text || 'Failed to fetch image');
      return;
    }
    // Pass through content-type and caching headers
    const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');

    // Stream the body
    const arrayBuffer = await upstream.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.setHeader('Content-Length', buffer.length);
    res.status(200).send(buffer);
  } catch (e) {
    res.status(500).send('Proxy error');
  }
}
