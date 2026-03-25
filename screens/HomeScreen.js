import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";

import ProductCard from "../components/ProductCard";

const colors = {
  pine: "#2F4A3C",
  earth: "#807157",
  sand: "#E8DFD1",
  mist: "#F5F1E8",
  bark: "#3F3328",
  ember: "#C96B3B",
};

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductFilter, setSelectedProductFilter] =
    useState("all");
  const [selectedBlogCategory, setSelectedBlogCategory] =
    useState("all");

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
      .then((response) => response.json())
      .then((data) => {
        const newProducts = [];

        for (let i = 0; i < (data.items || []).length; i++) {
          const item = data.items[i];
          const title = item.product.fieldData.name;
          const subtitle =
            item.product.fieldData.description || "";
          const price =
            (item.skus[0]?.fieldData.price?.value || 0) / 100;
          const imageUrl =
            item.skus[0]?.fieldData["main-image"]?.url ||
            "https://via.placeholder.com/150";

          let category = "gear";
          const lowerTitle =
            `${title} ${subtitle}`.toLowerCase();

          if (
            lowerTitle.includes("powerbank") ||
            lowerTitle.includes("lamp") ||
            lowerTitle.includes("solar") ||
            lowerTitle.includes("batterij") ||
            lowerTitle.includes("elektr")
          ) {
            category = "electronic-gear";
          }

          newProducts.push({
            id: item.product.id,
            title: title,
            subtitle: subtitle,
            price: price,
            category: category,
            image: { uri: imageUrl },
          });
        }

        setProducts(newProducts);
      })
      .catch((error) =>
        console.error("Error fetching products:", error)
      );
  }, []);

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
      .then((response) => response.json())
      .then((data) => {
        const newBlogs = [];

        for (let i = 0; i < (data.items || []).length; i++) {
          const item = data.items[i];
          const fieldData = item.fieldData || {};
          const title = fieldData.name || "Blog";
          const lowerTitle = title.toLowerCase();

          let imageUrl =
            fieldData["main-image"]?.url ||
            fieldData["thumbnail-image"]?.url ||
            fieldData["featured-image"]?.url ||
            fieldData["cover-image"]?.url ||
            fieldData["hero-image"]?.url ||
            fieldData["blog-image"]?.url ||
            fieldData["post-image"]?.url ||
            fieldData.image?.url ||
            fieldData["main-image"] ||
            fieldData["thumbnail-image"] ||
            fieldData["featured-image"] ||
            fieldData["cover-image"] ||
            fieldData["hero-image"] ||
            fieldData["blog-image"] ||
            fieldData["post-image"] ||
            fieldData.image ||
            "";

          let category = "camp";
          if (
            lowerTitle.includes("campfire") ||
            lowerTitle.includes("vuur")
          ) {
            category = "fire";
          } else if (
            lowerTitle.includes("backpack") ||
            lowerTitle.includes("tent") ||
            lowerTitle.includes("essentials")
          ) {
            category = "gear";
          }

          let description =
            fieldData.summary ||
            fieldData.description ||
            "Klik om meer info te lezen.";

          if (
            description.toLowerCase() === title.toLowerCase()
          ) {
            description = "Klik om meer info te lezen.";
          }

          let content =
            fieldData["post-body"] ||
            fieldData["blog-body"] ||
            fieldData.body ||
            fieldData.content ||
            fieldData.description ||
            fieldData.summary ||
            "";

          if (typeof content !== "string") {
            content = String(content);
          }

          content = content.replace(/<[^>]*>/g, " ").trim();

          if (
            lowerTitle.includes("perfecte campingplek kiest")
          ) {
            content =
              "De juiste campingplek kiezen maakt het verschil tussen een gewone nacht en een onvergetelijk avontuur. Een vlak stuk grond, beschutting tegen de wind en het geluid van de natuur om je heen - daar begint het echte buitenleven.\n\nHet gaat niet alleen om waar je slaapt, maar om de ervaring. De zonsopgang boven de bergen, het kampvuur dat langzaam uitdooft en de rust van de wildernis.\n\nEen goede plek geeft je ruimte om te ademen, te ontspannen en op te laden.\n\nKies slim. Geniet meer.";
          } else if (
            lowerTitle.includes("droog te blijven")
          ) {
            content =
              "Regen hoort bij het buitenleven. Donkere wolken trekken over de bergen en de eerste druppels vallen op je tentdoek. Maar met de juiste voorbereiding blijft je avontuur doorgaan.\n\nWaterdichte gear, een goed geplaatste tent en slimme bescherming maken het verschil tussen natte chaos en comfortabel kamperen.\n\nWant zelfs in de regen blijft de natuur indrukwekkend.\n\nBlijf droog. Blijf sterk. Ga verder.";
          } else if (
            lowerTitle.includes("sneller je tent")
          ) {
            content =
              "Na een lange hike wil je geen tijd verliezen met je tent. De wind trekt aan het doek, de zon zakt langzaam achter de bergen en je weet dat elke minuut telt.\n\nMet de juiste voorbereiding en een paar simpele tricks staat je tent sneller dan je denkt. Harings eerst, stokken klaar, alles binnen handbereik.\n\nEen goed opgezet kamp betekent rust, warmte en een plek om de dag af te sluiten.\n\nZet op. Kom tot rust. Geniet van het moment.";
          } else if (
            lowerTitle.includes("campfire safely")
          ) {
            content =
              "Een kampvuur maken is meer dan een paar takken aansteken. Het vraagt geduld, aandacht en respect voor de natuur. Het hout knispert, de vlammen dansen en langzaam verspreidt de warmte zich door de koude avondlucht.\n\nHet vuur brengt rust na een lange dag wandelen. Het is het moment om te stoppen, adem te halen en te genieten van de stilte van de natuur.\n\nEen goed kampvuur is niet alleen warmte. Het is het hart van het avontuur.\n\nBlijf ontdekken. Blijf genieten.";
            imageUrl = null;
          } else if (
            lowerTitle.includes("first camping trip")
          ) {
            content =
              "Alleen op pad gaan vraagt moed. Geen drukte, geen afleiding - alleen jij en de natuur. Elke stap door het bos, elke berg die je beklimt, brengt je dichter bij jezelf.\n\nAls solo explorer leer je vertrouwen op je eigen kracht. Je beslissingen, je voorbereiding en je doorzettingsvermogen maken het verschil.\n\nDe stilte van de natuur laat je nadenken, groeien en sterker terugkomen.\n\nSoms moet je alleen gaan om echt ver te komen.";
          } else if (
            lowerTitle.includes("perfect backpack")
          ) {
            content =
              "Een ruwe bergtop bereik je niet zomaar. Het vraagt voorbereiding, discipline en vooral doorzettingskracht. De wind wordt sterker, het pad steiler en elke stap voelt zwaarder, maar juist daar wordt het verschil gemaakt.\n\nDoorzetten wanneer je benen branden. Focus houden wanneer het uitzicht nog verborgen is. Vertrouwen op je uitrusting en op jezelf. Dat is waar echte avonturiers zich onderscheiden.\n\nDe top is geen eindpunt. Het is het bewijs dat je grenzen hebt verlegd.\n\nBlijf klimmen. Blijf groeien. Ga verder.";
          } else if (content === "") {
            content =
              "In deze blog vind je extra tips en inspiratie voor je volgende outdoor avontuur.";
          }

          let image;
          if (lowerTitle.includes("campfire")) {
            image = require("../assets/vuur.webp");
          } else if (imageUrl) {
            image = { uri: imageUrl };
          } else {
            image = { uri: "https://via.placeholder.com/150" };
          }

          newBlogs.push({
            id: item.id,
            title: title,
            description: description,
            content: content,
            category: category,
            image: image,
          });
        }

        setBlogs(newBlogs);
      })
      .catch((error) =>
        console.error("Error fetching blogs:", error)
      );
  }, []);

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      product.title.toLowerCase().includes(query) ||
      product.subtitle.toLowerCase().includes(query);

    if (selectedProductFilter === "all") {
      return matchesSearch;
    }

    return (
      product.category === selectedProductFilter &&
      matchesSearch
    );
  });

  const filteredBlogs = blogs.filter((blog) => {
    if (selectedBlogCategory === "all") {
      return true;
    }

    return blog.category === selectedBlogCategory;
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Outdoor Essentials</Text>
        <Text style={styles.subheading}>
          Alles voor je volgende avontuur in de natuur.
        </Text>

        <TextInput
          placeholder="Zoek een product..."
          placeholderTextColor="#8B7C68"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Onze producten</Text>
          <Text style={styles.sectionCaption}>
            Geselecteerd voor kamperen, hiking en avonden bij het vuur.
          </Text>
        </View>

        <View style={styles.productTabs}>
          <TouchableOpacity
            style={[
              styles.productTab,
              selectedProductFilter === "all" &&
                styles.productTabActive,
            ]}
            onPress={() => setSelectedProductFilter("all")}
          >
            <Text
              style={[
                styles.productTabText,
                selectedProductFilter === "all" &&
                  styles.productTabTextActive,
              ]}
            >
              Alles
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.productTab,
              selectedProductFilter === "gear" &&
                styles.productTabActive,
            ]}
            onPress={() => setSelectedProductFilter("gear")}
          >
            <Text
              style={[
                styles.productTabText,
                selectedProductFilter === "gear" &&
                  styles.productTabTextActive,
              ]}
            >
              Gear
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.productTab,
              selectedProductFilter === "electronic-gear" &&
                styles.productTabActive,
            ]}
            onPress={() =>
              setSelectedProductFilter("electronic-gear")
            }
          >
            <Text
              style={[
                styles.productTabText,
                selectedProductFilter === "electronic-gear" &&
                  styles.productTabTextActive,
              ]}
            >
              Elektronische gear
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          {filteredProducts.map((product) => (
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
        </View>

        <View style={styles.blogSection}>
          <Text style={styles.blogHeading}>Onze blog</Text>
          <Text style={styles.blogCaption}>
            Tips, guides en inspiratie voor buitenmensen.
          </Text>

          <View style={styles.blogTabs}>
            <TouchableOpacity
              style={[
                styles.blogTab,
                selectedBlogCategory === "all" &&
                  styles.blogTabActive,
              ]}
              onPress={() => setSelectedBlogCategory("all")}
            >
              <Text
                style={[
                  styles.blogTabText,
                  selectedBlogCategory === "all" &&
                    styles.blogTabTextActive,
                ]}
              >
                Alles
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.blogTab,
                selectedBlogCategory === "camp" &&
                  styles.blogTabActive,
              ]}
              onPress={() => setSelectedBlogCategory("camp")}
            >
              <Text
                style={[
                  styles.blogTabText,
                  selectedBlogCategory === "camp" &&
                    styles.blogTabTextActive,
                ]}
              >
                Kamperen
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.blogTab,
                selectedBlogCategory === "gear" &&
                  styles.blogTabActive,
              ]}
              onPress={() => setSelectedBlogCategory("gear")}
            >
              <Text
                style={[
                  styles.blogTabText,
                  selectedBlogCategory === "gear" &&
                    styles.blogTabTextActive,
                ]}
              >
                Gear
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.blogTab,
                selectedBlogCategory === "fire" &&
                  styles.blogTabActive,
              ]}
              onPress={() => setSelectedBlogCategory("fire")}
            >
              <Text
                style={[
                  styles.blogTabText,
                  selectedBlogCategory === "fire" &&
                    styles.blogTabTextActive,
                ]}
              >
                Kampvuur
              </Text>
            </TouchableOpacity>
          </View>

          {filteredBlogs.map((blog) => (
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
              <Image source={blog.image} style={styles.blogImage} />

              <Text style={styles.blogTitle}>{blog.title}</Text>

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

          {filteredBlogs.length === 0 && (
            <Text style={styles.emptyText}>
              Geen blogs gevonden in deze categorie.
            </Text>
          )}
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mist,
  },

  scrollContent: {
    paddingBottom: 28,
  },

  heading: {
    color: colors.bark,
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 60,
    marginBottom: 8,
  },

  subheading: {
    color: colors.pine,
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 28,
    lineHeight: 22,
  },

  input: {
    margin: 12,
    backgroundColor: colors.sand,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D5C7B0",
    color: colors.bark,
  },

  sectionHeader: {
    paddingHorizontal: 12,
    marginTop: 4,
    marginBottom: 12,
  },

  sectionTitle: {
    color: colors.bark,
    fontSize: 24,
    fontWeight: "800",
  },

  sectionCaption: {
    color: colors.pine,
    marginTop: 4,
  },

  productTabs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    marginBottom: 18,
    flexWrap: "wrap",
  },

  productTab: {
    backgroundColor: colors.sand,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#D5C7B0",
  },

  productTabActive: {
    backgroundColor: colors.earth,
    borderColor: colors.earth,
  },

  productTabText: {
    color: colors.bark,
    fontWeight: "700",
  },

  productTabTextActive: {
    color: colors.mist,
  },

  list: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  blogSection: {
    width: "100%",
    marginTop: 24,
    paddingHorizontal: 12,
  },

  blogHeading: {
    color: colors.bark,
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },

  blogCaption: {
    color: colors.pine,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 18,
  },

  blogTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    gap: 8,
  },

  blogTab: {
    flex: 1,
    backgroundColor: colors.sand,
    borderRadius: 999,
    paddingVertical: 11,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D5C7B0",
  },

  blogTabActive: {
    backgroundColor: colors.bark,
    borderColor: colors.bark,
  },

  blogTabText: {
    color: colors.bark,
    fontWeight: "700",
    fontSize: 13,
  },

  blogTabTextActive: {
    color: colors.mist,
  },

  blogCard: {
    backgroundColor: colors.bark,
    borderRadius: 22,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#6A5E4C",
  },

  blogImage: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    marginBottom: 12,
  },

  blogTitle: {
    color: colors.mist,
    fontSize: 16,
    fontWeight: "800",
  },

  blogExcerpt: {
    color: "#D8D0C4",
    marginTop: 6,
    marginBottom: 12,
    lineHeight: 20,
  },

  blogButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.earth,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  blogButtonText: {
    color: colors.mist,
    fontWeight: "700",
  },

  emptyText: {
    color: colors.pine,
    textAlign: "center",
    paddingVertical: 18,
  },
});

export default HomeScreen;
