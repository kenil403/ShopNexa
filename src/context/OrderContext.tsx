import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { Invoice } from '../types';
import { storage } from '../utils/storage';

interface OrderContextType {
  orders: Invoice[];
  orderCount: number;
  totalSpent: number;
  totalSaved: number;
  addOrder: (invoice: Invoice) => void;
  getOrder: (orderId: string) => Invoice | undefined;
  clearOrders: () => void;
}

export const OrderContext = createContext<OrderContextType | undefined>(
  undefined
);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Invoice[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load orders from storage on mount
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const storedOrders = await storage.getOrders();
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadOrders();
  }, []);

  // Persist orders on changes
  useEffect(() => {
    if (!isLoaded) return;
    const saveOrders = async () => {
      try {
        await storage.setOrders(JSON.stringify(orders));
      } catch (error) {
        console.error('Error saving orders:', error);
      }
    };
    saveOrders();
  }, [orders, isLoaded]);

  const orderCount = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalSaved = orders.reduce((sum, o) => {
    const itemsSaved = o.items.reduce((s, item) => {
      // saved is already baked into the price difference (original - actual)
      return s;
    }, 0);
    return sum + itemsSaved;
  }, 0);

  const addOrder = useCallback((invoice: Invoice) => {
    setOrders((prev) => [invoice, ...prev]);
  }, []);

  const getOrder = useCallback(
    (orderId: string) => {
      return orders.find((o) => o.orderId === orderId);
    },
    [orders]
  );

  const clearOrders = useCallback(() => {
    setOrders([]);
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        orderCount,
        totalSpent,
        totalSaved,
        addOrder,
        getOrder,
        clearOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
