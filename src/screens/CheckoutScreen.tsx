import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Product } from "../../types";

type CheckoutScreenRouteProp = RouteProp<RootStackParamList, "Checkout">;
type CheckoutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Checkout"
>;

type Props = {
  route: CheckoutScreenRouteProp;
  navigation: CheckoutScreenNavigationProp;
  cart: Product[];
  clearCart: () => void;
};

const CheckoutScreen: React.FC<Props> = ({ route, navigation, clearCart }) => {
  const { cart } = route.params;
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePlaceOrder = () => {
    // CORREÇÃO: Normaliza a string do método de pagamento para a validação
    const cleanPaymentMethod = paymentMethod.trim().toLowerCase();

    if (
      !fullName ||
      !address ||
      !city ||
      !zipCode ||
      !cleanPaymentMethod || // Verifica se o método de pagamento não está vazio
      (cleanPaymentMethod === "cartão de crédito" &&
        (!cardNumber || !expiryDate || !cvv))
    ) {
      Alert.alert("Preencha todos os campos obrigatórios!");
      return;
    }

    // Se a validação passar, o alerta de sucesso será exibido
    Alert.alert(
      "Pedido Realizado!",
      "Sua compra foi finalizada com sucesso. Agradecemos a preferência!",
      [
        {
          text: "OK",
          onPress: () => {
            clearCart();
            navigation.popToTop(); // Go back to the Home screen
          },
        },
      ]
    );
  };

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <ScrollView
      style={styles.finalButton}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Finalizar Compra</Text>

      <Text style={styles.sectionTitle}>Detalhes do Pedido:</Text>
      {cart.map((item) => (
        <Text key={item.id} style={styles.orderItem}>
          {item.name} - R$ {item.price}
        </Text>
      ))}
      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <Text style={styles.sectionTitle}>Informações de Entrega:</Text>
      <TextInput
        placeholder="Nome Completo"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Endereço"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <TextInput
        placeholder="Cidade"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />
      <TextInput
        placeholder="CEP"
        value={zipCode}
        onChangeText={setZipCode}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.sectionTitle}>Forma de Pagamento:</Text>
      <TextInput
        placeholder="Método de Pagamento (Ex: Cartão de Crédito, Boleto)"
        value={paymentMethod}
        onChangeText={setPaymentMethod}
        style={styles.input}
      />

      {/* CORREÇÃO: A mesma lógica de normalização é aplicada aqui para consistência */}
      {paymentMethod.trim().toLowerCase() === "cartão de crédito" && (
        <>
          <TextInput
            placeholder="Número do Cartão"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Data de Validade (MM/AA)"
            value={expiryDate}
            onChangeText={setExpiryDate}
            style={styles.input}
          />
          <TextInput
            placeholder="CVV"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            secureTextEntry
            style={styles.input}
          />
        </>
      )}

      <Button title="Finalizar Pedido" onPress={handlePlaceOrder} />
    </ScrollView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  finalButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  orderItem: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
    textAlign: "right",
  },
});
