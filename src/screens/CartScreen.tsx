import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { Product } from "../../types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, StackNavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";

type CartScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Carrinho"
>;

type Props = {
  cart: Product[];
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const CartScreen: React.FC<Props> = ({ cart, removeFromCart, clearCart }) => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleCheckout = () => {
    navigation.navigate("Checkout", { cart: cart });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>O carrinho está vazio.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>R$ {item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      {cart.length > 0 && (
        <Button title="Finalizar Compra" onPress={handleCheckout} />
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  empty: { marginTop: 20, fontSize: 16, color: "#666" },
  item: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { fontSize: 16, fontWeight: "500" },
  price: { fontSize: 14, color: "#555" },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 10,
    marginBottom: 20,
  },
});
