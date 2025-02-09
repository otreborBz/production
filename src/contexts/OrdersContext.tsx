import React, { createContext, useContext, useState } from 'react';
import { storage } from '../services/storage';

type Order = {
  id: string;
  family: string;
  model: string;
  quantity: string;
};

type OrdersContextData = {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  clearOrders: () => Promise<void>;
};

const OrdersContext = createContext<OrdersContextData>({} as OrdersContextData);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  async function clearOrders() {
    await storage.clearOrders();
    setOrders([]);
  }

  return (
    <OrdersContext.Provider value={{ orders, setOrders, clearOrders }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders deve ser usado dentro de um OrdersProvider');
  }
  return context;
} 