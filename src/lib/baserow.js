const API_BASE = "https://api.baserow.io/api/database/rows/table"

const TOKEN = import.meta.env.BASEROW_TOKEN
const BRANCHES_TABLE_ID = import.meta.env.BASEROW_BRANCHES_TABLE_ID
const POSITIONS_TABLE_ID = import.meta.env.BASEROW_POSITIONS_TABLE_ID
const APPLICATIONS_TABLE_ID = import.meta.env.BASEROW_APPLICATIONS_TABLE_ID
const EXPERIENCES_TABLE_ID = import.meta.env.BASEROW_EXPERIENCES_TABLE_ID
const CERTIFICATES_TABLE_ID = import.meta.env.BASEROW_CERTIFICATES_TABLE_ID

function getHeaders(isJson = false) {
  return {
    ...(isJson ? { "Content-Type": "application/json" } : {}),
    Authorization: `Token ${TOKEN}`,
  }
}

async function request(url, options = {}) {
  const res = await fetch(url, options)

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || "Baserow so‘rovida xatolik yuz berdi")
  }

  return res.json()
}

export async function getBranches() {
  const url = `${API_BASE}/${BRANCHES_TABLE_ID}/?user_field_names=true&size=200`
  const data = await request(url, {
    headers: getHeaders(),
  })
  return data.results || []
}

export async function getPositions() {
  const url = `${API_BASE}/${POSITIONS_TABLE_ID}/?user_field_names=true&size=200`
  const data = await request(url, {
    headers: getHeaders(),
  })
  return data.results || []
}

export async function createApplication(payload) {
  const url = `${API_BASE}/${APPLICATIONS_TABLE_ID}/?user_field_names=true`

  return request(url, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(payload),
  })
}

export async function createExperience(payload) {
  const url = `${API_BASE}/${EXPERIENCES_TABLE_ID}/?user_field_names=true`

  return request(url, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(payload),
  })
}

export async function createCertificate(payload) {
  const url = `${API_BASE}/${CERTIFICATES_TABLE_ID}/?user_field_names=true`

  return request(url, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(payload),
  })
}