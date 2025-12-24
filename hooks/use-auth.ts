// "use client"

// import { useState, useEffect } from "react"
// import type { AuthState } from "@/lib/types"

// export function useAuth() {
//   const [authState, setAuthState] = useState<AuthState>({
//     isAuthenticated: false,
//     user: null,
//   })
//   const [mounted, setMounted] = useState(false)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     setMounted(true)
//     checkSession()
//   }, [])

//   const checkSession = async () => {
//     try {
//       const response = await fetch("/api/auth/me", {
//         credentials: "include",
//       })
//       if (response.ok) {
//         const data = await response.json()
//         setAuthState({
//           isAuthenticated: true,
//           user: data.user,
//         })
//       } else {
//         setAuthState({
//           isAuthenticated: false,
//           user: null,
//         })
//       }
//     } catch (error) {
//       console.error("Session check error:", error)
//       setAuthState({
//         isAuthenticated: false,
//         user: null,
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email, password }),
//       })

//       if (response.ok) {
//         const data = await response.json()
//         setAuthState({
//           isAuthenticated: true,
//           user: data.user,
//         })
//         return { success: true }
//       } else {
//         const data = await response.json()
//         return { success: false, error: data.error || "فشل تسجيل الدخول" }
//       }
//     } catch (error) {
//       console.error("Login error:", error)
//       return { success: false, error: "حدث خطأ في الاتصال" }
//     }
//   }

//   const logout = async () => {
//     try {
//       await fetch("/api/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       })
//       setAuthState({ isAuthenticated: false, user: null })
//     } catch (error) {
//       console.error("Logout error:", error)
//     }
//   }

//   const signup = async (
//     name: string,
//     email: string,
//     password: string,
//     confirmPassword: string,
//   ): Promise<{ success: boolean; error?: string }> => {
//     try {
//       const response = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ name, email, password, confirmPassword }),
//       })

//       if (response.ok) {
//         const data = await response.json()
//         setAuthState({
//           isAuthenticated: true,
//           user: data.user,
//         })
//         return { success: true }
//       } else {
//         const data = await response.json()
//         return { success: false, error: data.error || "فشل إنشاء الحساب" }
//       }
//     } catch (error) {
//       console.error("Signup error:", error)
//       return { success: false, error: "حدث خطأ في الاتصال" }
//     }
//   }

//   return {
//     ...authState,
//     login,
//     logout,
//     signup,
//     mounted,
//     loading,
//   }
// }

"use client";

import { useAuthContext } from "@/app/context/AuthProvider";

export function useAuth() {
  return useAuthContext();
}
