import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const USERS_STORAGE_KEY = "users";
const CURRENT_USER_STORAGE_KEY = "currentUser";

const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveStoredUsers = (users) => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error("Failed to save users to localStorage:", err);
  }
};

const getStoredCurrentUser = () => {
  try {
    const raw = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(getStoredCurrentUser);
  const [loading] = useState(false);

  const signUp = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      throw new Error("User already exists with this email address.");
    }

    const newUser = {
      uid: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: normalizedEmail,
      password,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    saveStoredUsers(updatedUsers);

    const sessionUser = {
      uid: newUser.uid,
      email: newUser.email,
    };

    setCurrentUser(sessionUser);
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  };

  const login = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getStoredUsers();

    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() === normalizedEmail &&
        user.password === password
    );

    if (!matchedUser) {
      throw new Error("Invalid email or password.");
    }

    const sessionUser = {
      uid: matchedUser.uid,
      email: matchedUser.email,
    };

    setCurrentUser(sessionUser);
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    setCurrentUser(null);
  };

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      signUp,
      signup: signUp,
      login,
      logout,
    }),
    [currentUser, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
