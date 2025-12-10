import type { CartItem, User, AuthState, Product } from "./types";

// Cart Management
export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem("stride-cart");
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("stride-cart", JSON.stringify(cart));
};

export const addToCart = (item: CartItem): void => {
  const cart = getCart();
  const existingItem = cart.find(
    (i) => i.id === item.id && i.selectedSize === item.selectedSize
  );

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
};

export const updateCartItemQuantity = (
  id: string,
  size: number,
  quantity: number
): void => {
  const cart = getCart();
  const item = cart.find((i) => i.id === id && i.selectedSize === size);

  if (item) {
    if (quantity <= 0) {
      removeFromCart(id, size);
    } else {
      item.quantity = quantity;
      saveCart(cart);
    }
  }
};

export const removeFromCart = (id: string, size: number): void => {
  const cart = getCart();
  const updatedCart = cart.filter(
    (item) => !(item.id === id && item.selectedSize === size)
  );
  saveCart(updatedCart);
};

export const clearCart = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("stride-cart");
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// Auth Management
export const getAuthState = (): AuthState => {
  if (typeof window === "undefined")
    return { isAuthenticated: false, user: null };
  const auth = localStorage.getItem("stride-auth");
  return auth ? JSON.parse(auth) : { isAuthenticated: false, user: null };
};

export const saveAuthState = (authState: AuthState): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("stride-auth", JSON.stringify(authState));
};

export const getUsers = (): User[] => {
  if (typeof window === "undefined") return [];
  const users = localStorage.getItem("stride-users");
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  if (typeof window === "undefined") return;
  localStorage.setItem("stride-users", JSON.stringify(users));
};

export const login = (email: string, password: string): boolean => {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    saveAuthState({ isAuthenticated: true, user });
    return true;
  }

  return false;
};

export const logout = (): void => {
  saveAuthState({ isAuthenticated: false, user: null });
};

export const signup = (
  name: string,
  email: string,
  password: string
): boolean => {
  const users = getUsers();
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return false;
  }

  const newUser: User = { name, email, password };
  saveUser(newUser);
  saveAuthState({ isAuthenticated: true, user: newUser });
  return true;
};
