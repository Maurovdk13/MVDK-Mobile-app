import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  Switch,
} from "react-native";

import ProductCard from "./components/ProductCard";

export default function App() {

  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Onze modellen</Text>

      <TextInput
        placeholder="Zoek motor..."
        style={styles.search}
      />

      <View style={styles.switchContainer}>
        <Text style={{color:"white"}}>Donkere modus</Text>

        <Switch
          value={isEnabled}
          onValueChange={() => setIsEnabled(!isEnabled)}
        />
      </View>

      <Button title="Filter producten" />

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
    marginBottom: 15,
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

});