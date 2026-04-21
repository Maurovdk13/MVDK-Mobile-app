import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";

const colors = {
  earth: "#807157",
  sand: "#E8DFD1",
  mist: "#F5F1E8",
  bark: "#3F3328",
  pine: "#2F4A3C",
  ember: "#C96B3B",
};

const ProductDetailsScreen = ({ route }) => {
  const { title, description, price, image } = route.params;
  const [quantity, setQuantity] = useState(1);

  let priceNumber = Number(String(price).replace("EUR", "").replace("€", "").trim());

  if (isNaN(priceNumber)) {
    priceNumber = 0;
  }

  const totalPrice = (priceNumber * quantity).toFixed(2);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Image source={image} style={styles.image} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>€{priceNumber.toFixed(2)}</Text>

      <View style={styles.quantityCard}>
        <Text style={styles.sectionTitle}>Aantal</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantity}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Totaalprijs</Text>
        <Text style={styles.totalPrice}>€{totalPrice}</Text>
      </View>

      <View style={styles.specsCard}>
        <Text style={styles.sectionTitle}>Specificaties</Text>

        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Gebruik</Text>
          <Text style={styles.specValue}>Outdoor & kamperen</Text>
        </View>

        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Comfort</Text>
          <Text style={styles.specValue}>Licht en praktisch</Text>
        </View>

        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Levering</Text>
          <Text style={styles.specValue}>Op voorraad</Text>
        </View>
      </View>

      <View style={styles.buyButton}>
        <Button title="Voeg toe aan mandje" color={colors.earth} onPress={() => {}} />
      </View>
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
    borderRadius: 18,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.bark,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginVertical: 10,
    color: colors.pine,
    lineHeight: 22,
  },
  price: {
    color: colors.ember,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 18,
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
  sectionTitle: {
    color: colors.bark,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 44,
    height: 44,
    backgroundColor: colors.earth,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    color: colors.mist,
    fontSize: 20,
    fontWeight: "800",
  },
  quantity: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.bark,
    minWidth: 28,
    textAlign: "center",
  },
  totalBox: {
    width: "100%",
    backgroundColor: colors.sand,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#D5C7B0",
    padding: 16,
    marginBottom: 16,
  },
  totalLabel: {
    color: colors.pine,
    marginBottom: 8,
  },
  totalPrice: {
    color: colors.ember,
    fontSize: 24,
    fontWeight: "bold",
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
  buyButton: {
    width: "100%",
  },
});

export default ProductDetailsScreen;
