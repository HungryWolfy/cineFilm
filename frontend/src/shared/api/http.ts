export async function fetchJson<T = any>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  // Принудительно кастим результат к типу T
  return res.json() as Promise<T>;
}