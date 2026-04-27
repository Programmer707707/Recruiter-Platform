export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const tableId = process.env.BASEROW_CERTIFICATES_TABLE_ID;
  const token = process.env.BASEROW_TOKEN;

  if (!tableId || !token) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  const url = `https://api.baserow.io/api/database/rows/table/${tableId}/?user_field_names=true`;

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(req.body),
    });
    if (!r.ok) {
      return res.status(r.status).json({ error: await r.text() });
    }
    return res.status(200).json(await r.json());
  } catch (err) {
    return res.status(500).json({ error: 'Internal error' });
  }
}