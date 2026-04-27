export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const tableId = process.env.BASEROW_POSITIONS_TABLE_ID;
  const token = process.env.BASEROW_TOKEN;

  if (!tableId || !token) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  const url = `https://api.baserow.io/api/database/rows/table/${tableId}/?user_field_names=true&size=200`;

  try {
    const r = await fetch(url, {
      headers: { Authorization: `Token ${token}` },
    });
    if (!r.ok) {
      return res.status(r.status).json({ error: await r.text() });
    }
    const data = await r.json();
    return res.status(200).json(data.results || []);
  } catch (err) {
    return res.status(500).json({ error: 'Internal error' });
  }
}