import { apiBase, getSession } from "./auth";

export async function apiGet<T>(path: string): Promise<T> {
  const session = getSession();
  const response = await fetch(`${apiBase()}${path}`, {
    headers: session ? { Authorization: `Bearer ${session.token}` } : undefined,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}
