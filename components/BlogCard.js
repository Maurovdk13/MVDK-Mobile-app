import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BlogCard({ title, description, image }) {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate("Details", {
          title,
          description,
          image,
          type: "blog", // 👈 belangrijk
        })
      }
    >
      <Image source={image} style={styles.image} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    width: "48%",
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },

  title: {
    fontWeight: "bold",
  },

  description: {
    color: "gray",
  },
});