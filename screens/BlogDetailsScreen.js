import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const colors = {
  pine: "#2F4A3C",
  sand: "#E8DFD1",
  mist: "#F5F1E8",
  bark: "#3F3328",
};

const BlogDetailsScreen = ({ route }) => {
  const { title, description, image } = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mist,
  },
  contentContainer: {
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
    marginBottom: 12,
  },
  text: {
    color: colors.pine,
    lineHeight: 24,
    backgroundColor: colors.sand,
    padding: 16,
    borderRadius: 18,
  },
});

export default BlogDetailsScreen;
