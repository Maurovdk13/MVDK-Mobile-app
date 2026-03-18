import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProductCard({ title, description, price, image }) {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate("Details", {
          title,
          description,
          price,
          image,
          type: "product",
        })
      }
    >
      <Image source={image} style={styles.image} />

      <Text style={styles.title}>{title}</Text>

      {/* 👇 voorkomt errors als iets ontbreekt */}
      {description && (
        <Text style={styles.description}>{description}</Text>
      )}

      {price && (
        <Text style={styles.price}>{price}</Text>
      )}

      <View style={styles.button}>
        <Text style={styles.buttonText}>Bekijk product</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 12,
    width: "48%",
    marginBottom: 20,

    // 👇 mooi design (extra punten)
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
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