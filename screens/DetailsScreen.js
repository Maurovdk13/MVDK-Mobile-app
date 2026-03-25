import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const colors = {
  pine: "#2F4A3C",
  earth: "#807157",
  sand: "#E8DFD1",
  mist: "#F5F1E8",
  bark: "#3F3328",
  ember: "#C96B3B",
};

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

      <Text
        style={[
          styles.title,
          type === "blog"
            ? styles.blogTitle
            : styles.productTitle,
        ]}
      >
        {title}
      </Text>

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
    backgroundColor: colors.mist,
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
    borderRadius: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.bark,
  },

  blogTitle: {
    alignSelf: "flex-start",
  },

  productTitle: {
    alignSelf: "center",
    textAlign: "center",
  },

  description: {
    textAlign: "center",
    marginVertical: 10,
    color: colors.pine,
    lineHeight: 22,
  },

  blogText: {
    width: "100%",
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    color: colors.pine,
    backgroundColor: colors.sand,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#D5C7B0",
  },

  price: {
    color: colors.ember,
    fontWeight: "bold",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  button: {
    padding: 10,
    backgroundColor: colors.earth,
    margin: 10,
    borderRadius: 12,
  },
});

export default DetailsScreen;
