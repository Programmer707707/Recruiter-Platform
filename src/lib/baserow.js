async function request(url, options = {}) {
  const res = await fetch(url, options)

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || "So‘rovda xatolik yuz berdi")
  }

  return res.json()
}

export async function getBranches() {
  return request("/api/branches")
}

export async function getPositions() {
  return request("/api/positions")
}

export async function createApplication(payload) {
  return request("/api/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
}

export async function createExperience(payload) {
  return request("/api/experiences", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
}

export async function createCertificate(payload) {
  return request("/api/certificates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
}