import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/sites/698c7fb2a269f43d1814eb3c/products",
      {
        headers: {
          Authorization:
            "Bearer 3b13bd0f07d7e57b05ba7431be014af0763ebe90a406731a7e4b201839980a68",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.items.map((item) => ({
          id: item.product.id,
          title: item.product.fieldData.name,
          description: item.product.fieldData.description,
          price:
            (item.skus[0]?.fieldData.price?.value || 0) / 100,
          image: {
            uri: item.skus[0]?.fieldData["main-image"]?.url,
          },
        }));

        setProducts(mapped);
      })
      .catch((error) =>
        console.error("Error fetching products:", error)
      );
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ons aanbod</Text>

      <TextInput
        placeholder="Zoek producten of blogs..."
        style={styles.search}
      />

      {/* PRODUCTEN */}
      <Text style={styles.sectionTitle}>Producten</Text>

      <View style={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={`€${product.price}`}
            image={product.image}
            onPress={() =>
              navigation.navigate("Details", {
                ...product,
                type: "product",
              })
            }
          />
        ))}
      </View>

      {/* BLOGS */}
      <Text style={styles.sectionTitle}>Blogs</Text>

      <View style={styles.grid}>
        <BlogCard
  title="5 tips voor kamperen"
  description="Leer hoe je beter kan kamperen."
  image={require("../assets/blog1.jpg")}
  onPress={() =>
    navigation.navigate("Details", {
      title: "5 tips voor kamperen",
      description: "Leer hoe je beter kan kamperen.",
      image: require("../assets/blog1.jpg"),
      type: "blog",
    })
  }
/>

<BlogCard
  title="Beste tenten van 2025"
  description="Onze top keuzes."
  image={require("../assets/blog2.jpeg")}
  onPress={() =>
    navigation.navigate("Details", {
      title: "Beste tenten van 2025",
      description: "Onze top keuzes.",
      image: require("../assets/blog2.jpeg"),
      type: "blog",
    })
  }
/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    padding: 20,
    paddingBottom: 40,
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