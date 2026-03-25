import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const colors = {
  pine: "#2F4A3C",
  earth: "#807157",
  sand: "#E8DFD1",
  mist: "#F5F1E8",
  bark: "#3F3328",
  ember: "#C96B3B",
};

export default function ProductCard({
  title,
  description,
  price,
  image,
  onPress,
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>

      <Text style={styles.price}>{price}</Text>

      <View style={styles.button}>
        <Text style={styles.buttonText}>Bekijk product</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.sand,
    padding: 15,
    borderRadius: 18,
    width: "48%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#D5C7B0",
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.bark,
    marginBottom: 6,
  },

  description: {
    color: colors.pine,
    marginBottom: 10,
  },

  price: {
    color: colors.ember,
    fontWeight: "bold",
    marginBottom: 14,
    fontSize: 17,
  },

  button: {
    backgroundColor: colors.earth,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: colors.mist,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});
