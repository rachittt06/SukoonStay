import axios from "axios";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const TOKEN_KEY = "sukoonstay_token";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = axios.interceptors.request.use((config) => {
      const t = localStorage.getItem(TOKEN_KEY);
      if (t) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${t}`;
      }
      return config;
    });
    return () => axios.interceptors.request.eject(id);
  }, []);

  const fetchMe = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/auth/me");
      if (data?.success) setUser(data.user);
      else setUser(null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const signup = async ({ username, email, password, image }) => {
    const { data } = await axios.post("/api/auth/register", {
      username,
      email,
      password,
      image
    });
    if (!data?.success) throw new Error(data?.message || "Signup failed");
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const signin = async ({ email, password }) => {
    const { data } = await axios.post("/api/auth/login", { email, password });
    if (!data?.success) throw new Error(data?.message || "Signin failed");
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const signout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      signup,
      signin,
      signout,
      refresh: fetchMe
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

