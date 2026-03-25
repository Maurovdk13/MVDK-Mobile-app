import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const DetailsScreen = ({ route }) => {
  const { title, description, price, image, type } = route.params;

  const [quantity, setQuantity] = useState(1);

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>

      {type === "product" && (
        <>
          <Text style={styles.price}>{price}</Text>

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => setQuantity(quantity - 1)}
              style={styles.button}
            >
              <Text>-</Text>
            </TouchableOpacity>

            <Text>{quantity}</Text>

            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              style={styles.button}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },

  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  description: {
    textAlign: "center",
    marginVertical: 10,
  },

  price: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  button: {
    padding: 10,
    backgroundColor: "#ddd",
    margin: 10,
  },
});

export default DetailsScreen;