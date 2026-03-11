import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

import ProductCard from "./components/ProductCard";

export default function App() {

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Onze Tenten</Text>

      <TextInput
        placeholder="Zoek tent..."
        style={styles.search}
      />

      <View style={styles.grid}>

        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />

      </View>

      <StatusBar style="auto" />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "black",
    padding: 20,
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