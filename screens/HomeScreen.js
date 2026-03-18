import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

import ProductCard from "../components/ProductCard";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.title}>Onze modellen</Text>

      <TextInput
        placeholder="Zoek product..."
        style={styles.search}
      />

      <View style={styles.grid}>
        <ProductCard
          title="Mountain Tent"
          description="Dit comfortabele Mountain Tent is perfect voor je buitenavonturen."
          price="€299"
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