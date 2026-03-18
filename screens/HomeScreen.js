import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>Onze modellen</Text>

      <TextInput
        placeholder="Zoek producten of blogs..."
        style={styles.search}
      />

      {/* PRODUCTEN */}
      <Text style={styles.sectionTitle}>Producten</Text>

      <View style={styles.grid}>
        <ProductCard
          title="Mountain Tent"
          description="Dit comfortabele Mountain Tent is perfect voor je buitenavonturen."
          price="€299"
          image={require("../assets/tent.jpg")}
        />

        <ProductCard
          title="Alpine Explorer Tent"
          description="Perfect voor bergbeklimmers en extreme weersomstandigheden."
          price="€349"
          image={require("../assets/tent.jpg")}
        />
      </View>

      {/* BLOGS */}
      <Text style={styles.sectionTitle}>Blogs</Text>

      <View style={styles.grid}>
        <BlogCard
          title="5 tips voor kamperen"
          description="Leer hoe je beter kan kamperen."
          image={require("../assets/tent.jpg")}
        />

        <BlogCard
          title="Beste tenten van 2025"
          description="Onze top keuzes."
          image={require("../assets/tent.jpg")}
        />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    padding: 20,
    paddingBottom: 40, // 👈 extra ruimte onderaan
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },

  search: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default HomeScreen;