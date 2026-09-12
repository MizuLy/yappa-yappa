import { useEffect, useState } from "react";
import { refresh, login as apiLogin, logout as apiLogout } from "../api/auth";
import {
  setAccessTokenGetter,
  setAccessTokenUpdater,
  setAuthFailureHandler,
} from "../api/axiosInstance";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAccessTokenGetter(() => accessToken);
    setAccessTokenUpdater(setAccessToken);
    setAuthFailureHandler(() => {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem("yappaHasSession");
    });
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return undefined;

    const refreshSession = async () => {
      try {
        const res = await refresh();
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
      } catch {
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem("yappaHasSession");
      }
    };

    const intervalId = window.setInterval(refreshSession, 10 * 60 * 1000);
    return () => window.clearInterval(intervalId);
  }, [accessToken]);

  useEffect(() => {
    const tryRefresh = async () => {
      if (localStorage.getItem("yappaHasSession") !== "true") {
        setLoading(false);
        return;
      }

      try {
        const res = await refresh();
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
      } catch {
        setAccessToken(null);
        setUser(null);
        localStorage.removeItem("yappaHasSession");
      } finally {
        setLoading(false);
      }
    };
    tryRefresh();
  }, []);

  const login = async (data) => {
    const res = await apiLogin(data);
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
    localStorage.setItem("yappaHasSession", "true");
  };

  const setSession = ({ user: nextUser, accessToken: nextAccessToken }) => {
    setUser(nextUser);
    setAccessToken(nextAccessToken);
    localStorage.setItem("yappaHasSession", "true");
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("yappaHasSession");
  };
  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, setSession, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
