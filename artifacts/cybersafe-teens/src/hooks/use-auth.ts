import { useState, useCallback } from "react";

const USERNAME_KEY = "cybersafe_username";

export function useAuth() {
  const [username, setUsernameState] = useState<string | null>(
    () => localStorage.getItem(USERNAME_KEY) || null
  );

  const setUsername = useCallback((name: string) => {
    localStorage.setItem(USERNAME_KEY, name);
    setUsernameState(name);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(USERNAME_KEY);
    setUsernameState(null);
  }, []);

  return { username, setUsername, logout };
}
