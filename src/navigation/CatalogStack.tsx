import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CatalogStackParamList } from '../types';
import CatalogScreen from '../screens/main/CatalogScreen';
import ProductDetailScreen from '../screens/main/ProductDetailScreen';

const Stack = createNativeStackNavigator<CatalogStackParamList>();

const CatalogStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Catalog" component={CatalogScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

export default CatalogStack;
