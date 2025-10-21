export default async function handler(req, res) {
  res.status(410).json({ error: 'Google Drive images API disabled' });
  return;
}
