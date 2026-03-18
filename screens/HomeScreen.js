import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

import ProductCard from "../components/ProductCard";

const HomeScreen = () => {

  const products = [
    {
      id: 1,
      title: "Mountain Tent",
      price: "€129",
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
      description: "Lichtgewicht 2-persoons tent",
    },
    {
      id: 2,
      title: "Family Tent",
      price: "€199",
      image: "https://images.unsplash.com/photo-1526779259212-756e4c1d2b5d",
      description: "Ruime tent voor gezinnen",
    },
    {
      id: 3,
      title: "Compact Tent",
      price: "€89",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      description: "Ideaal voor korte trips",
    },
    {
      id: 4,
      title: "Pro Camping Tent",
      price: "€249",
      image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9",
      description: "Voor echte avonturiers",
    },
    {
      id: 5,
      title: "Ultra Light Tent",
      price: "€159",
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d",
      description: "Super licht en compact",
    },
    {
      id: 6,
      title: "Explorer Tent",
      price: "€179",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
      description: "Perfect voor lange reizen",
    },
  ];

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Onze Tenten</Text>

      <TextInput
        placeholder="Zoek tent..."
        style={styles.search}
      />

      <View style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>

      <StatusBar style="auto" />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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