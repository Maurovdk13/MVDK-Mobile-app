import React from "react";
import { View, Text, ScrollView, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductDetail = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>

      {/* Afbeelding */}
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
        }}
        style={styles.image}
      />

      {/* Titel */}
      <Text style={styles.title}>Mountain Camping Tent</Text>

      {/* Prijs */}
      <Text style={styles.price}>€129</Text>

      {/* Beschrijving */}
      <Text style={styles.description}>
        Deze lichtgewicht 2-persoons tent is perfect voor kamperen,
        hiking en outdoor avonturen. Waterdicht, compact en makkelijk op te zetten.
      </Text>

      {/* Specificaties */}
      <View style={styles.specs}>
        <Text style={styles.spec}>⛺ Capaciteit: 2 personen</Text>
        <Text style={styles.spec}>⚖️ Gewicht: 2.5 kg</Text>
        <Text style={styles.spec}>🌧️ Waterdicht</Text>
      </View>

      {/* Knop */}
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Toevoegen aan winkelmand</Text>
      </Pressable>

      {/* Terug knop */}
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Terug</Text>
      </Pressable>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
  },

  title: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },

  price: {
    color: "#2E8B57",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  description: {
    color: "lightgray",
    fontSize: 16,
    marginBottom: 20,
  },

  specs: {
    marginBottom: 30,
  },

  spec: {
    color: "white",
    marginBottom: 5,
  },

  button: {
    backgroundColor: "#2E8B57",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  back: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
});

export default ProductDetail;