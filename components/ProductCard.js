import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

export default function ProductCard() {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: "https://powersports.honda.com/-/media/products/family/cbr650r/gallery/my25/cbr650r-gallery-1-750x750.jpg",
        }}
        style={styles.image}
      />

      <Text style={styles.title}>Honda CBR650R</Text>

      <Text style={styles.description}>
        Pure viercilinderprestaties
      </Text>

      <Text style={styles.price}>€8999</Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Bekijk product</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 12,
    width: 160,
    marginBottom: 20,
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
  },

  description: {
    color: "gray",
    marginVertical: 5,
  },

  price: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});