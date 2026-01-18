export type UserRole = "ADMIN" | "TRAINER" | "STUDENT";

export type Session = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
};

const STORAGE_KEY = "digitechpro_session";

export function getSession(): Session | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function setSession(session: Session) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEY);
}

export function apiBase() {
  return "http://localhost:4000/api";
}
