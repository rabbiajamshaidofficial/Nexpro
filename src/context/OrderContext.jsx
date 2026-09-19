import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const OrderContext = createContext(null);

const ORDERS_STORAGE_KEY = "nexpro_orders";

const readStoredOrders = () => {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveStoredOrders = (orders) => {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error("Failed to save orders to localStorage", err);
  }
};

export function OrderProvider({ children }) {
  const { currentUser } = useAuth();
  const [allOrders, setAllOrders] = useState(readStoredOrders);

  // Filter orders for the currently logged-in user
  const userOrders = useMemo(() => {
    if (!currentUser?.email) return [];
    const normalizedEmail = currentUser.email.toLowerCase();
    return allOrders.filter(
      (order) => order.userEmail?.toLowerCase() === normalizedEmail
    );
  }, [allOrders, currentUser]);

  const createOrder = useCallback(
    ({
      items,
      subtotal,
      shippingFee = 0,
      total,
      shippingDetails,
      paymentMethod = "Credit Card",
    }) => {
      if (!currentUser?.email) {
        throw new Error("Must be logged in to create an order");
      }

      const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
      const orderNumber = Math.floor(1000 + Math.random() * 9000);
      const orderId = `NEX-${orderNumber}-${randomSuffix}`;

      const now = new Date();
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(now);

      const newOrder = {
        id: orderId,
        createdAt: now.toISOString(),
        formattedDate,
        userEmail: currentUser.email,
        userId: currentUser.uid || `usr_${currentUser.email}`,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category || "Hardware",
          quantity: item.quantity,
        })),
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        subtotal,
        shippingFee,
        total,
        shippingDetails,
        paymentMethod,
        status: "Order Placed",
        estimatedDelivery: "2–3 Business Days",
      };

      setAllOrders((prevOrders) => {
        const updated = [newOrder, ...prevOrders];
        saveStoredOrders(updated);
        return updated;
      });

      return newOrder;
    },
    [currentUser]
  );

  const getOrderById = useCallback(
    (id) => {
      return allOrders.find((order) => order.id === id) || null;
    },
    [allOrders]
  );

  const value = useMemo(
    () => ({
      orders: userOrders,
      allOrders,
      createOrder,
      getOrderById,
    }),
    [userOrders, allOrders, createOrder, getOrderById]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within OrderProvider");
  }
  return context;
};
