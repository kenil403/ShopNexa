import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

// Root
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Admin: undefined;
};

// Auth
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

// Main Tabs
export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  CatalogTab: NavigatorScreenParams<CatalogStackParamList>;
  CartTab: NavigatorScreenParams<CartStackParamList>;
  NotificationsTab: undefined;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
  AdminTab: NavigatorScreenParams<AdminStackParamList>;
};

// Home Stack
export type HomeStackParamList = {
  Home: undefined;
  ProductDetail: { productId: string };
};

// Catalog Stack
export type CatalogStackParamList = {
  Catalog: undefined;
  ProductDetail: { productId: string };
};

// Admin Stack
export type AdminStackParamList = {
  AdminDashboard: undefined;
  AddProduct: undefined;
  EditProduct: { productId: string };
};

// Cart Stack (for checkout flow)
export type CartStackParamList = {
  Cart: undefined;
  Checkout: undefined;
  OrderSuccess: { orderId: string };
};

// Profile Stack
export type ProfileStackParamList = {
  Profile: undefined;
  Wishlist: undefined;
  OrderHistory: undefined;
  ProductDetail: { productId: string };
};

// Screen Props
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type CatalogStackScreenProps<T extends keyof CatalogStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CatalogStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type AdminStackScreenProps<T extends keyof AdminStackParamList> =
  NativeStackScreenProps<AdminStackParamList, T>;

export type CartStackScreenProps<T extends keyof CartStackParamList> =
  NativeStackScreenProps<CartStackParamList, T>;
