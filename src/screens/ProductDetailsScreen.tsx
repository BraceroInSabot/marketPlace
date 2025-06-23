import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

const ProductDetailsScreen = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const { product } = route.params;

  return (
    <View style={styles.container}>
      {product.imageUrl ? (
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.noImage}>
          <Text>Sem imagem</Text>
        </View>
      )}
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>R$ {product.price}</Text>
      <Text style={styles.description}>
        {product.description || "Sem descrição disponível."}
      </Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  price: { fontSize: 20, color: "green", marginBottom: 10 },
  description: { fontSize: 16, color: "#333" },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 10,
  },
  noImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
  },
});
