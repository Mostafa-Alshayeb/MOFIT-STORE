"use client";

import { useState, useEffect } from "react";
import type { AuthState } from "@/lib/types";

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setAuthState({
          isAuthenticated: true,
          user: data.user,
        });
        await syncCartAndFavorites();
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
        });
      }
    } catch (error) {
      console.error("Session check error:", error);
      setAuthState({
        isAuthenticated: false,
        user: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const syncCartAndFavorites = async () => {
    try {
      // Load favorites from server
      const favResponse = await fetch("/api/user/favorites");
      if (favResponse.ok) {
        const favData = await favResponse.json();
        localStorage.setItem("favorites", JSON.stringify(favData.favorites));
      }

      // Load cart from server
      const cartResponse = await fetch("/api/user/cart");
      if (cartResponse.ok) {
        const cartData = await cartResponse.json();
        localStorage.setItem("stride-cart", JSON.stringify(cartData.cart));
      }
    } catch (error) {
      console.error("Error syncing data:", error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuthState({
          isAuthenticated: true,
          user: data.user,
        });
        await syncCartAndFavorites();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const cart = localStorage.getItem("stride-cart");
      const favorites = localStorage.getItem("favorites");

      if (cart) {
        await fetch("/api/user/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: JSON.parse(cart) }),
        });
      }

      if (favorites) {
        await fetch("/api/user/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ favorites: JSON.parse(favorites) }),
        });
      }

      await fetch("/api/auth/logout", { method: "POST" });
      setAuthState({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuthState({
          isAuthenticated: true,
          user: data.user,
        });
        await syncCartAndFavorites();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  return {
    ...authState,
    login,
    logout,
    signup,
    mounted,
    loading,
  };
}
