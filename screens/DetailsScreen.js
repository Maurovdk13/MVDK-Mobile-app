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
  const { title, description, price, image, type } =
    route.params;

  const [quantity, setQuantity] = useState(1);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Image source={image} style={styles.image} />

      {type === "blog" && (
        <Text style={styles.blogTitle}>{title}</Text>
      )}

      {type === "product" && (
        <Text style={styles.productTitle}>{title}</Text>
      )}

      {type === "blog" && (
        <Text style={styles.blogText}>{description}</Text>
      )}

      {type === "product" && (
        <Text style={styles.description}>{description}</Text>
      )}

      {type === "product" && (
        <>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              Outdoor keuze
            </Text>
          </View>

          <Text style={styles.price}>{price}</Text>

          <View style={styles.quantityCard}>
            <Text style={styles.quantityLabel}>
              Aantal
            </Text>

            <View style={styles.row}>
              <TouchableOpacity
                onPress={() =>
                  setQuantity(Math.max(1, quantity - 1))
                }
                style={styles.button}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.quantityValue}>
                {quantity}
              </Text>

              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.specsCard}>
            <Text style={styles.specsTitle}>
              Specificaties
            </Text>

            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Gebruik</Text>
              <Text style={styles.specValue}>
                Outdoor & kamperen
              </Text>
            </View>

            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Comfort</Text>
              <Text style={styles.specValue}>
                Licht en praktisch
              </Text>
            </View>

            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Levering</Text>
              <Text style={styles.specValue}>
                Op voorraad
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>
              Voeg toe aan mandje
            </Text>
          </TouchableOpacity>

          <Text style={styles.deliveryText}>
            Klaar voor je volgende avontuur.
          </Text>
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

  blogTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.bark,
    alignSelf: "flex-start",
  },

  productTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.bark,
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
    marginBottom: 18,
    fontSize: 28,
  },

  badge: {
    marginTop: 4,
    marginBottom: 14,
    backgroundColor: colors.earth,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },

  badgeText: {
    color: colors.mist,
    fontWeight: "700",
  },

  quantityCard: {
    width: "100%",
    backgroundColor: colors.sand,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#D5C7B0",
    padding: 16,
    marginBottom: 16,
  },

  quantityLabel: {
    color: colors.bark,
    fontWeight: "700",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    width: 44,
    height: 44,
    backgroundColor: colors.earth,
    margin: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: colors.mist,
    fontSize: 20,
    fontWeight: "800",
  },

  quantityValue: {
    color: colors.bark,
    fontSize: 20,
    fontWeight: "800",
    minWidth: 28,
    textAlign: "center",
  },

  specsCard: {
    width: "100%",
    backgroundColor: colors.sand,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#D5C7B0",
    padding: 16,
    marginBottom: 18,
  },

  specsTitle: {
    color: colors.bark,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },

  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#DCCFB9",
  },

  specLabel: {
    color: colors.pine,
    fontWeight: "600",
  },

  specValue: {
    color: colors.bark,
    fontWeight: "700",
  },

  ctaButton: {
    width: "100%",
    backgroundColor: colors.bark,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 12,
  },

  ctaButtonText: {
    color: colors.mist,
    fontSize: 16,
    fontWeight: "800",
  },

  deliveryText: {
    color: colors.pine,
    textAlign: "center",
  },
});

export default DetailsScreen;
