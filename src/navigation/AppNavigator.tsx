import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import { Product } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RootStackParamList = {
  Home: undefined;
  Carrinho: undefined;
  ProductDetails: { product: Product };
  Checkout: { cart: Product[] };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const saveCartToStorage = async (cart: Product[]) => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Erro ao salvar carrinho:", error);
    }
  };

  const loadCartFromStorage = async () => {
    try {
      const cartData = await AsyncStorage.getItem("cart");
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await loadCartFromStorage();
      setCart(storedCart);
    };
    loadCart();
  }, []);

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} addToCart={addToCart} />}
        </Stack.Screen>
        <Stack.Screen name="Carrinho">
          {(props) => (
            <CartScreen
              {...props}
              cart={cart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{ title: "Detalhes do Produto" }}
        />
        <Stack.Screen name="Checkout" options={{ title: "Finalizar Compra" }}>
          {(props) => (
            <CheckoutScreen {...props} cart={cart} clearCart={clearCart} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
