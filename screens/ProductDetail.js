import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductDetail = ({ route }) => {
  const { title, description, price, image } = route.params;

const [quantity, setQuantity] = useState(1);

const increaseQuantity =()=>setQuantity(quantity+1);
const decreaseQuantity = () => {
    if (quantity >1){
        setQuantity(quantity-1);
    }
};

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>

      <Text style={styles.price}>{price}</Text>
      <touchableOpacity onPress={decreaseQuantity} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </touchableOpacity>

        <Text style={styles.quantityText}>{quantity}</Text>

        <touchableOpacity onPress={increaseQuantity} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </touchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
  },

  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  description: {
    color: "gray",
    marginVertical: 10,
    textAlign: "center",
  },

  price: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ProductDetail;