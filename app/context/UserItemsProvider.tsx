// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import type { CartItemType } from "@/lib/types";
// import { useAuthContext } from "./AuthProvider";

// interface UserItemsContextType {
//   cart: CartItemType[];
//   favorites: string[];
//   mounted: boolean;
//   addToCart: (item: CartItemType) => Promise<void>;
//   removeFromCart: (id: string) => Promise<void>;
//   addFavorite: (id: string) => Promise<void>;
//   removeFavorite: (id: string) => Promise<void>;
//   isFavorited: (id: string) => boolean;
//   getCartItemCount: () => number;
//   getCartTotal: () => number;
// }

// const UserItemsContext = createContext<UserItemsContextType | undefined>(
//   undefined
// );

// export function UserItemsProvider({ children }: { children: ReactNode }) {
//   const { isAuthenticated } = useAuthContext();
//   const [cart, setCart] = useState<CartItemType[]>([]);
//   const [favorites, setFavorites] = useState<string[]>([]);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     const loadUserItems = async () => {
//       if (isAuthenticated) {
//         try {
//           const res = await fetch("/api/user/items", {
//             credentials: "include",
//           });
//           if (res.ok) {
//             const data = await res.json();
//             setCart(data.cart ?? []);
//             setFavorites(data.favorites ?? []);
//           }
//         } catch (err) {
//           console.error("Failed to load user items:", err);
//         }
//       } else {
//         const storedCart = localStorage.getItem("cart");
//         const storedFav = localStorage.getItem("favorites");
//         if (storedCart) setCart(JSON.parse(storedCart));
//         if (storedFav) setFavorites(JSON.parse(storedFav));
//       }
//       setMounted(true);
//     };

//     loadUserItems();
//   }, [isAuthenticated]);

//   const saveCart = (newCart: CartItemType[]) => {
//     setCart(newCart);
//     if (!isAuthenticated) localStorage.setItem("cart", JSON.stringify(newCart));
//   };

//   const saveFavorites = (newFav: string[]) => {
//     setFavorites(newFav);
//     if (!isAuthenticated)
//       localStorage.setItem("favorites", JSON.stringify(newFav));
//   };

//   const addToCart = async (item: CartItemType) => {
//     if (isAuthenticated) {
//       await fetch("/api/cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(item),
//       });
//       const res = await fetch("/api/user/items", { credentials: "include" });
//       const data = await res.json();
//       setCart(data.cart ?? []);
//     } else {
//       const exists = cart.find(
//         (c) => c._id === item._id && c.selectedSize === item.selectedSize
//       );
//       if (exists) {
//         saveCart(
//           cart.map((c) =>
//             c._id === item._id && c.selectedSize === item.selectedSize
//               ? { ...c, quantity: c.quantity + item.quantity }
//               : c
//           )
//         );
//       } else {
//         saveCart([...cart, item]);
//       }
//     }
//   };

//   const removeFromCart = async (id: string) => {
//     if (isAuthenticated) {
//       await fetch(`/api/cart/${id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       const res = await fetch("/api/user/items", { credentials: "include" });
//       const data = await res.json();
//       setCart(data.cart ?? []);
//     } else {
//       saveCart(cart.filter((c) => c._id !== id));
//     }
//   };
//   const getCartItemCount = () =>
//     cart.reduce((acc, item) => acc + item.quantity, 0);
//   const getCartTotal = () =>
//     cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   const addFavorite = async (productId: string) => {
//     if (isAuthenticated) {
//       await fetch("/api/favorites", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ productId }),
//       });
//       const res = await fetch("/api/user/items", { credentials: "include" });
//       const data = await res.json();
//       setFavorites(data.favorites ?? []);
//     } else {
//       if (!favorites.includes(productId))
//         saveFavorites([...favorites, productId]);
//     }
//   };

//   const removeFavorite = async (productId: string) => {
//     if (isAuthenticated) {
//       await fetch(`/api/favorites/${productId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       const res = await fetch("/api/user/items", { credentials: "include" });
//       const data = await res.json();
//       setFavorites(data.favorites ?? []);
//     } else {
//       saveFavorites(favorites.filter((f) => f !== productId));
//     }
//   };
//   const isFavorited = (productId: string) => {
//     return favorites.includes(productId);
//   };

//   return (
//     <UserItemsContext.Provider
//       value={{
//         cart,
//         favorites,
//         mounted,
//         addToCart,
//         removeFromCart,
//         addFavorite,
//         removeFavorite,
//         isFavorited,
//         getCartItemCount,
//         getCartTotal,
//       }}
//     >
//       {children}
//     </UserItemsContext.Provider>
//   );
// }

// export const useUserItems = () => {
//   const ctx = useContext(UserItemsContext);
//   if (!ctx)
//     throw new Error("useUserItems must be used within UserItemsProvider");
//   return ctx;
// };

// content of app/context/UserItemsProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { CartItemType } from "@/lib/types";
import { useAuthContext } from "./AuthProvider";
// interface UserItemsContextType {
//   cart: CartItemType[];
//   favorites: string[];
//   mounted: boolean;
//   addToCart: (item: CartItemType) => Promise<void>;
//   removeFromCart: (id: string) => Promise<void>;
//   updateCartItemQuantity: (id: string, quantity: number) => Promise<void>;
//   clearCart: () => Promise<void>;
//   addFavorite: (id: string) => Promise<void>;
//   removeFavorite: (id: string) => Promise<void>;
//   isFavorited: (id: string) => boolean;
//   getCartItemCount: () => number;
//   getCartTotal: () => number;
// }
interface UserItemsContextType {
  cart: CartItemType[];
  favorites: string[];
  mounted: boolean;

  addToCart: (item: CartItemType) => Promise<void>;

  removeFromCart: (productId: string, selectedSize: number) => Promise<void>;

  updateCartItemQuantity: (
    productId: string,
    selectedSize: number,
    quantity: number
  ) => Promise<void>;

  clearCart: () => Promise<void>;

  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;

  isFavorited: (id: string) => boolean;
  getCartItemCount: () => number;
  getCartTotal: () => number;
}

const UserItemsContext = createContext<UserItemsContextType | undefined>(
  undefined
);

export function UserItemsProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, mounted: authMounted } = useAuthContext();
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!authMounted) return;

    const loadUserItems = async () => {
      if (isAuthenticated) {
        try {
          const res = await fetch("/api/user/items", {
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            setCart(data.cart ?? []);
            setFavorites(data.favorites ?? []);
          }
        } catch (err) {
          console.error("Failed to load user items:", err);
        }
      } else {
        const storedCart = localStorage.getItem("cart");
        const storedFav = localStorage.getItem("favorites");
        if (storedCart) setCart(JSON.parse(storedCart));
        if (storedFav) setFavorites(JSON.parse(storedFav));
      }
      setMounted(true);
    };

    loadUserItems();
  }, [isAuthenticated, authMounted]);

  const saveCart = (newCart: CartItemType[]) => {
    setCart(newCart);
    if (!isAuthenticated) localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const saveFavorites = (newFav: string[]) => {
    setFavorites(newFav);
    if (!isAuthenticated)
      localStorage.setItem("favorites", JSON.stringify(newFav));
  };

  const addToCart = async (item: CartItemType) => {
    if (isAuthenticated) {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: item.userId,
          productId: item.productId,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          price: item.price,
          description: item.description,
          brand: item.brand,
          sizes: item.sizes,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to add to cart:", res.status, errorText);
        return;
      }

      const data = await res.json();
      setCart(data.cart ?? []);
    } else {
      // LocalStorage (Guest)
      const exists = cart.find(
        (c) => c.id === item.id && c.selectedSize === item.selectedSize
      );

      if (exists) {
        saveCart(
          cart.map((c) =>
            c.id === item.id && c.selectedSize === item.selectedSize
              ? { ...c, quantity: c.quantity + item.quantity }
              : c
          )
        );
      } else {
        saveCart([...cart, item]);
      }
    }
  };

  const updateCartItemQuantity = async (
    productId: string,
    selectedSize: number,
    quantity: number
  ) => {
    if (isAuthenticated) {
      await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, selectedSize, quantity }),
      });

      const res = await fetch("/api/user/items", {
        credentials: "include",
      });
      const data = await res.json();
      setCart(data.cart ?? []);
    } else {
      saveCart(
        cart.map((c) =>
          c.id === productId && c.selectedSize === selectedSize
            ? { ...c, quantity }
            : c
        )
      );
    }
  };

  const removeFromCart = async (productId: string, selectedSize: number) => {
    if (isAuthenticated) {
      await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, selectedSize }),
      });

      const res = await fetch("/api/user/items", {
        credentials: "include",
      });
      const data = await res.json();
      setCart(data.cart ?? []);
    } else {
      saveCart(
        cart.filter(
          (c) => !(c.id === productId && c.selectedSize === selectedSize)
        )
      );
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      await fetch("/api/cart", {
        method: "DELETE",
        credentials: "include",
      });
      setCart([]);
    } else {
      saveCart([]);
    }
  };

  const getCartItemCount = () =>
    cart.reduce((acc, item) => acc + item.quantity, 0);

  const getCartTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const addFavorite = async (productId: string) => {
    if (isAuthenticated) {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      const res = await fetch("/api/user/items", { credentials: "include" });
      const data = await res.json();
      setFavorites(data.favorites ?? []);
    } else {
      if (!favorites.includes(productId))
        saveFavorites([...favorites, productId]);
    }
  };

  const removeFavorite = async (productId: string) => {
    if (isAuthenticated) {
      await fetch(`/api/favorites/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      const res = await fetch("/api/user/items", { credentials: "include" });
      const data = await res.json();
      setFavorites(data.favorites ?? []);
    } else {
      saveFavorites(favorites.filter((f) => f !== productId));
    }
  };

  const isFavorited = (productId: string) => {
    return favorites.includes(productId);
  };

  return (
    <UserItemsContext.Provider
      value={{
        cart,
        favorites,
        mounted,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        addFavorite,
        removeFavorite,
        isFavorited,
        getCartItemCount,
        getCartTotal,
      }}
    >
      {children}
    </UserItemsContext.Provider>
  );
}

export const useUserItems = () => {
  const ctx = useContext(UserItemsContext);
  if (!ctx)
    throw new Error("useUserItems must be used within UserItemsProvider");
  return ctx;
};
