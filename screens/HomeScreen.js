import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TextInput,
  Pressable,
  Image,
} from "react-native";

import ProductCard from "../components/ProductCard";

const fallbackBlogImages = {
  "how to start a campfire safely": require("../assets/blog1.jpg"),
};

// 🔥 helper voor images
const getImageUrl = (fieldData = {}) => {
  const possibleImage =
    fieldData["main-image"] ||
    fieldData["thumbnail-image"] ||
    fieldData["featured-image"] ||
    fieldData["cover-image"] ||
    fieldData["hero-image"] ||
    fieldData["blog-image"] ||
    fieldData["post-thumbnail"] ||
    fieldData.thumbnail ||
    fieldData["post-image"] ||
    fieldData.image;

  if (typeof possibleImage === "string") {
    return possibleImage;
  }

  return possibleImage?.url || null;
};

const getFallbackBlogImage = (title = "") => {
  const normalizedTitle = title.trim().toLowerCase();

  if (fallbackBlogImages[normalizedTitle]) {
    return fallbackBlogImages[normalizedTitle];
  }

  if (normalizedTitle.includes("campfire")) {
    return require("../assets/blog1.jpg");
  }

  return { uri: "https://via.placeholder.com/150" };
};

const getTextFromValue = (value) => {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    const trimmedValue = value.trim();
    return trimmedValue.length > 0 ? trimmedValue : null;
  }

  if (Array.isArray(value)) {
    const text = value
      .map((item) => getTextFromValue(item))
      .filter(Boolean)
      .join("\n\n")
      .trim();

    return text.length > 0 ? text : null;
  }

  if (typeof value === "object") {
    return (
      getTextFromValue(value.text) ||
      getTextFromValue(value.plainText) ||
      getTextFromValue(value.html) ||
      getTextFromValue(value.children) ||
      getTextFromValue(value.content) ||
      getTextFromValue(value.blocks) ||
      getTextFromValue(value.nodes)
    );
  }

  return null;
};

const getBlogContent = (fieldData = {}) =>
  getTextFromValue(fieldData["post-body"]) ||
  getTextFromValue(fieldData["blog-body"]) ||
  getTextFromValue(fieldData.body) ||
  getTextFromValue(fieldData.content) ||
  getTextFromValue(fieldData.description) ||
  getTextFromValue(fieldData.summary) ||
  "Geen blogtekst gevonden.";

const getBlogExcerpt = (fieldData = {}, title = "") => {
  const excerpt =
    getTextFromValue(fieldData.summary) ||
    getTextFromValue(fieldData.description);

  if (!excerpt || excerpt === "Geen blogtekst gevonden.") {
    return "Klik om meer info te lezen.";
  }

  if (excerpt.trim().toLowerCase() === title.trim().toLowerCase()) {
    return "Klik om meer info te lezen.";
  }

  return excerpt;
};

const generateBlogContent = (title, excerpt) => {
  const safeTitle = title || "This blog";
  const safeExcerpt =
    excerpt &&
    excerpt !== "Geen blogtekst gevonden." &&
    excerpt !== "Klik om meer info te lezen." &&
    excerpt.trim().toLowerCase() !== safeTitle.trim().toLowerCase()
      ? excerpt
      : `${safeTitle} neemt je mee in handige tips en inspiratie voor buitenavonturen.`;

  return `${safeExcerpt}

In dit artikel ontdek je stap voor stap hoe je hier zelf mee aan de slag kunt gaan. We leggen alles eenvoudig uit, zodat je snel begrijpt wat belangrijk is en waar je op moet letten.

Daarna krijg je extra praktische tips, veelgemaakte fouten om te vermijden en ideeën om het nog beter aan te pakken. Zo heb je niet alleen inspiratie, maar ook meteen bruikbare informatie om zelf te starten.

Of je nu nog maar net begint of al wat ervaring hebt: deze blog helpt je verder met duidelijke uitleg en concrete aanbevelingen.`;
};

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () =>
    setIsEnabled((previousState) => !previousState);

  // 🔥 PRODUCTS
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
        setProducts(
          (data.items || []).map((item) => ({
            id: item.product.id,
            title: item.product.fieldData.name,
            subtitle: item.product.fieldData.description,
            price:
              (item.skus[0]?.fieldData.price?.value || 0) / 100,
            image: {
              uri:
                item.skus[0]?.fieldData["main-image"]?.url ||
                "https://via.placeholder.com/150",
            },
          }))
        );
      })
      .catch((error) =>
        console.error("Error fetching products:", error)
      );
  }, []);

  // 🔥 BLOGS (GEFIXT)
  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/collections/699efbc02f270876dc903d10/items",
      {
        headers: {
          Authorization:
            "Bearer 3b13bd0f07d7e57b05ba7431be014af0763ebe90a406731a7e4b201839980a68",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogs(
          (data.items || []).map((item) => {
            const title =
              item.fieldData?.name || "Untitled blog";
            const excerpt = getBlogExcerpt(
              item.fieldData,
              title
            );
            const normalizedTitle = title
              .trim()
              .toLowerCase();
            const imageUrl = normalizedTitle.includes("campfire")
              ? null
              : getImageUrl(item.fieldData);

            return {
              id: item.id,

              title,

              description: excerpt,
              content: generateBlogContent(
                title,
                getBlogContent(item.fieldData) || excerpt
              ),

              image: imageUrl
                ? { uri: imageUrl }
                : getFallbackBlogImage(title),
            };
          })
        );
      })
      .catch((error) =>
        console.error("Error fetching blogs:", error)
      );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our offer</Text>

      <TextInput
        placeholder="Search a product..."
        style={styles.input}
      />

      <View style={styles.switchRow}>
        <Text style={{ color: "#fff" }}>
          Only show promotions
        </Text>

        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#81b0ff" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {/* PRODUCTS */}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.subtitle}
            price={`€${product.price}`}
            image={product.image}
            onPress={() =>
              navigation.navigate("Details", {
                title: product.title,
                description: product.subtitle,
                price: `€${product.price}`,
                image: product.image,
                type: "product",
              })
            }
          />
        ))}

        {/* BLOGS */}
        <View style={styles.blogSection}>
          <Text style={styles.blogHeading}>
            Latest blogs
          </Text>

          {blogs.map((blog) => (
            <Pressable
              key={blog.id}
              style={styles.blogCard}
              onPress={() =>
                navigation.navigate("Details", {
                  title: blog.title,
                  description: blog.content,
                  image: blog.image,
                  type: "blog",
                })
              }
            >
              <Image
                source={blog.image}
                style={styles.blogImage}
              />

              <Text style={styles.blogTitle}>
                {blog.title}
              </Text>

              <Text style={styles.blogExcerpt}>
                {blog.description}
              </Text>

              <View style={styles.blogButton}>
                <Text style={styles.blogButtonText}>
                  Lees meer
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  heading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 60,
    marginBottom: 12,
  },

  list: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  input: {
    margin: 12,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    alignItems: "center",
  },

  blogSection: {
    width: "100%",
    marginTop: 20,
  },

  blogHeading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },

  blogCard: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },

  blogImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },

  blogTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  blogExcerpt: {
    color: "#ccc",
    marginTop: 5,
    marginBottom: 12,
  },

  blogButton: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  blogButtonText: {
    color: "#111",
    fontWeight: "700",
  },
});

export default HomeScreen;
