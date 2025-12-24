// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import type { AuthState, User } from "@/lib/types";

// interface AuthContextType extends AuthState {
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => Promise<void>;
//   signup: (
//     name: string,
//     email: string,
//     password: string,
//     confirmPassword: string
//   ) => Promise<boolean>;
//   mounted: boolean;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [authState, setAuthState] = useState<AuthState>({
//     isAuthenticated: false,
//     user: null,
//   });
//   const [mounted, setMounted] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const res = await fetch("/api/auth/me", {
//           credentials: "include",
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setAuthState({ isAuthenticated: true, user: data.user });
//         } else {
//           setAuthState({ isAuthenticated: false, user: null });
//         }
//       } catch {
//         setAuthState({ isAuthenticated: false, user: null });
//       } finally {
//         setLoading(false);
//         setMounted(true);
//       }
//     };

//     checkSession();
//   }, []);

//   const login = async (email: string, password: string) => {
//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//       credentials: "include",
//     });

//     if (res.ok) {
//       const data = await res.json();
//       setAuthState({ isAuthenticated: true, user: data.user });
//       return true;
//     }
//     return false;
//   };

//   const logout = async () => {
//     await fetch("/api/auth/logout", {
//       method: "POST",
//       credentials: "include",
//     });
//     setAuthState({ isAuthenticated: false, user: null });
//   };

//   const signup = async (
//     name: string,
//     email: string,
//     password: string,
//     confirmPassword: string
//   ) => {
//     const res = await fetch("/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password, confirmPassword }),
//       credentials: "include",
//     });

//     if (res.ok) {
//       const data = await res.json();
//       setAuthState({ isAuthenticated: true, user: data.user });
//       return true;
//     }
//     return false;
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         ...authState,
//         login,
//         logout,
//         signup,
//         mounted,
//         loading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuthContext = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
//   return ctx;
// };

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { AuthState } from "@/lib/types";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<boolean>;
  mounted: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setAuthState({ isAuthenticated: true, user: data.user });
        } else {
          setAuthState({ isAuthenticated: false, user: null });
        }
      } catch {
        setAuthState({ isAuthenticated: false, user: null });
      } finally {
        setLoading(false);
        setMounted(true);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      setAuthState({ isAuthenticated: true, user: data.user });
      return true;
    }
    return false;
  };

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setAuthState({ isAuthenticated: false, user: null });
    localStorage.removeItem("cart");
    localStorage.removeItem("favorites");
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, confirmPassword }),
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      setAuthState({ isAuthenticated: true, user: data.user });
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        signup,
        mounted,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};
