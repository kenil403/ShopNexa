import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const CART_KEY = 'cart_items';
const WISHLIST_KEY = 'wishlist_items';
const ORDERS_KEY = 'order_history';

export const storage = {
  // Token
  getToken: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },
  setToken: async (token: string): Promise<void> => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },
  removeToken: async (): Promise<void> => {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },

  // User
  getUser: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(USER_KEY);
  },
  setUser: async (user: string): Promise<void> => {
    await AsyncStorage.setItem(USER_KEY, user);
  },
  removeUser: async (): Promise<void> => {
    await AsyncStorage.removeItem(USER_KEY);
  },

  // Cart
  getCart: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(CART_KEY);
  },
  setCart: async (cart: string): Promise<void> => {
    await AsyncStorage.setItem(CART_KEY, cart);
  },
  removeCart: async (): Promise<void> => {
    await AsyncStorage.removeItem(CART_KEY);
  },

  // Wishlist
  getWishlist: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(WISHLIST_KEY);
  },
  setWishlist: async (wishlist: string): Promise<void> => {
    await AsyncStorage.setItem(WISHLIST_KEY, wishlist);
  },
  removeWishlist: async (): Promise<void> => {
    await AsyncStorage.removeItem(WISHLIST_KEY);
  },

  // Orders / Invoices
  getOrders: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(ORDERS_KEY);
  },
  setOrders: async (orders: string): Promise<void> => {
    await AsyncStorage.setItem(ORDERS_KEY, orders);
  },
  removeOrders: async (): Promise<void> => {
    await AsyncStorage.removeItem(ORDERS_KEY);
  },

  // Clear All
  clearAll: async (): Promise<void> => {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY, CART_KEY, WISHLIST_KEY, ORDERS_KEY]);
  },
};
