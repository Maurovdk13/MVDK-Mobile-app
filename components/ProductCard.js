import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProductCard() {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
        }}
        style={styles.image}
      />

      <Text style={styles.title}>Mountain Camping Tent</Text>

      <Text style={styles.description}>
        Lichtgewicht 2-persoons tent voor outdoor avonturen
      </Text>

      <Text style={styles.price}>€129</Text>
      
      <Pressable style={styles.button} onPress={() => navigation.navigate("Details")}>
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
    color: "green",
    fontWeight: "bold",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#2E8B57",
    padding: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});