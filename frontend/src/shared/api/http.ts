export async function fetchJson(url: string, options?: RequestInit) {
  const res = await fetch(`${url}`, options)

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  const data = await res.json()
  return data
}
