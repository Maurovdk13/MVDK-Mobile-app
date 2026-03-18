import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const DetailsScreen = ({ route }) => {
  const { title, description, price, image, type } = route.params || {};

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>

      <Image source={image} style={styles.image} />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>

      {/* Alleen voor product */}
      {type === "product" && (
        <>
          <Text style={styles.price}>{price}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity onPress={increaseQuantity} style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Text style={styles.type}>
        {type === "product" ? "Product" : "Blog artikel"}
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  description: {
    color: "gray",
    marginVertical: 10,
    textAlign: "center",
  },

  price: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  type: {
    marginTop: 20,
    color: "gray",
  },
});

export default DetailsScreen;