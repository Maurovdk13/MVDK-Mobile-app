import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const DetailsScreen = ({ route }) => {
  const { title, description, price, image, type } = route.params;

  const [quantity, setQuantity] = useState(1);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Image source={image} style={styles.image} />

      <Text style={styles.title}>{title}</Text>

      {type === "blog" ? (
        <Text style={styles.blogText}>{description}</Text>
      ) : (
        <Text style={styles.description}>{description}</Text>
      )}

      {type === "product" && (
        <>
          <Text style={styles.price}>{price}</Text>

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => setQuantity(quantity - 1)}
              style={styles.button}
            >
              <Text>-</Text>
            </TouchableOpacity>

            <Text>{quantity}</Text>

            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              style={styles.button}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  contentContainer: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
  },

  image: {
    width: "100%",
    height: 250,
    marginBottom: 20,
    borderRadius: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },

  description: {
    textAlign: "center",
    marginVertical: 10,
  },

  blogText: {
    width: "100%",
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    color: "#222",
  },

  price: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  button: {
    padding: 10,
    backgroundColor: "#ddd",
    margin: 10,
  },
});

export default DetailsScreen;
