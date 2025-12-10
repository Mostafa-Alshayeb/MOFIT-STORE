import type { Order } from "./types";

const ORDERS_KEY = "stride_orders";

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const orders = localStorage.getItem(ORDERS_KEY);
    return orders ? JSON.parse(orders) : [];
  } catch {
    return [];
  }
}

export function createOrder(order: Order): void {
  if (typeof window === "undefined") return;
  try {
    const orders = getOrders();
    orders.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error("Failed to create order:", error);
  }
}

export function getOrderById(id: string): Order | null {
  const orders = getOrders();
  return orders.find((order) => order.id === id) || null;
}

export function getUserOrders(userId: string): Order[] {
  const orders = getOrders();
  return orders.filter((order) => order.userId === userId);
}
