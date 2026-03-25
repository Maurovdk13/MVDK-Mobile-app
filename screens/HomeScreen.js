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
  moss: "#5F6F52",
  earth: "#807157",
  sand: "#E8DFD1",
  mist: "#F5F1E8",
  bark: "#3F3328",
  ember: "#C96B3B",
};

const productFilters = [
  { label: "Alles", value: "all" },
  { label: "Gear", value: "gear" },
  { label: "Elektronische gear", value: "electronic-gear" },
];

const customBlogContent = {
  "hoe je de perfecte campingplek kiest":
    "De juiste campingplek kiezen maakt het verschil tussen een gewone nacht en een onvergetelijk avontuur. Een vlak stuk grond, beschutting tegen de wind en het geluid van de natuur om je heen — daar begint het echte buitenleven.\n\nHet gaat niet alleen om waar je slaapt, maar om de ervaring. De zonsopgang boven de bergen, het kampvuur dat langzaam uitdooft en de rust van de wildernis.\n\nEen goede plek geeft je ruimte om te ademen, te ontspannen en op te laden.\n\nKies slim. Geniet meer. 🌄",
  "hoe droog te blijven bij het kamperen":
    "Regen hoort bij het buitenleven. Donkere wolken trekken over de bergen en de eerste druppels vallen op je tentdoek. Maar met de juiste voorbereiding blijft je avontuur doorgaan.\n\nWaterdichte gear, een goed geplaatste tent en slimme bescherming maken het verschil tussen natte chaos en comfortabel kamperen.\n\nWant zelfs in de regen blijft de natuur indrukwekkend.\n\nBlijf droog. Blijf sterk. Ga verder. 🌧",
  "5 tricks om sneller je tent op te zetten":
    "Na een lange hike wil je geen tijd verliezen met je tent. De wind trekt aan het doek, de zon zakt langzaam achter de bergen en je weet dat elke minuut telt.\n\nMet de juiste voorbereiding en een paar simpele tricks staat je tent sneller dan je denkt. Harings eerst, stokken klaar, alles binnen handbereik.\n\nEen goed opgezet kamp betekent rust, warmte en een plek om de dag af te sluiten.\n\nZet op. Kom tot rust. Geniet van het moment. 🏕",
  "how to start a campfire safely":
    "Een kampvuur maken is meer dan een paar takken aansteken. Het vraagt geduld, aandacht en respect voor de natuur. Het hout knispert, de vlammen dansen en langzaam verspreidt de warmte zich door de koude avondlucht.\n\nHet vuur brengt rust na een lange dag wandelen. Het is het moment om te stoppen, adem te halen en te genieten van de stilte van de natuur.\n\nEen goed kampvuur is niet alleen warmte. Het is het hart van het avontuur.\n\nBlijf ontdekken. Blijf genieten. 🔥",
  "10 essentials for your first camping trip":
    "Alleen op pad gaan vraagt moed. Geen drukte, geen afleiding — alleen jij en de natuur. Elke stap door het bos, elke berg die je beklimt, brengt je dichter bij jezelf.\n\nAls solo explorer leer je vertrouwen op je eigen kracht. Je beslissingen, je voorbereiding en je doorzettingsvermogen maken het verschil.\n\nDe stilte van de natuur laat je nadenken, groeien en sterker terugkomen.\n\nSoms moet je alleen gaan... om echt ver te komen. 🌲",
  "how to choose the perfect backpack":
    "Een ruwe bergtop bereik je niet zomaar. Het vraagt voorbereiding, discipline en vooral doorzettingskracht. De wind wordt sterker, het pad steiler en elke stap voelt zwaarder, maar juist daar wordt het verschil gemaakt.\n\nDoorzetten wanneer je benen branden. Focus houden wanneer het uitzicht nog verborgen is. Vertrouwen op je uitrusting en op jezelf. Dat is waar echte avonturiers zich onderscheiden.\n\nDe top is geen eindpunt. Het is het bewijs dat je grenzen hebt verlegd.\n\nBlijf klimmen. Blijf groeien. Ga verder. 🔥",
};

const normalizeTitle = (title = "") =>
  title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

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
  const normalizedTitle = normalizeTitle(title);

  if (normalizedTitle.includes("campfire")) {
    return require("../assets/vuur.webp");
  }

  return { uri: "https://via.placeholder.com/150" };
};

const getCustomBlogContent = (title = "") => {
  const normalizedTitle = normalizeTitle(title);

  const exactMatch = Object.entries(customBlogContent).find(
    ([key]) => normalizeTitle(key) === normalizedTitle
  );

  return exactMatch ? exactMatch[1] : null;
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

  if (normalizeTitle(excerpt) === normalizeTitle(title)) {
    return "Klik om meer info te lezen.";
  }

  return excerpt;
};

const generateBlogContent = (title, excerpt) => {
  const customContent = getCustomBlogContent(title);

  if (customContent) {
    return customContent;
  }

  const safeTitle = title || "This blog";
  const safeExcerpt =
    excerpt &&
    excerpt !== "Geen blogtekst gevonden." &&
    excerpt !== "Klik om meer info te lezen." &&
    normalizeTitle(excerpt) !== normalizeTitle(safeTitle)
      ? excerpt
      : `${safeTitle} neemt je mee in handige tips en inspiratie voor buitenavonturen.`;

  return `${safeExcerpt}

In dit artikel ontdek je stap voor stap hoe je hier zelf mee aan de slag kunt gaan. We leggen alles eenvoudig uit, zodat je snel begrijpt wat belangrijk is en waar je op moet letten.

Daarna krijg je extra praktische tips, veelgemaakte fouten om te vermijden en ideeën om het nog beter aan te pakken. Zo heb je niet alleen inspiratie, maar ook meteen bruikbare informatie om zelf te starten.

Of je nu nog maar net begint of al wat ervaring hebt: deze blog helpt je verder met duidelijke uitleg en concrete aanbevelingen.`;
};

const getBlogCategory = (title = "") => {
  const normalizedTitle = normalizeTitle(title);

  if (
    normalizedTitle.includes("campfire") ||
    normalizedTitle.includes("vuur")
  ) {
    return "fire";
  }

  if (
    normalizedTitle.includes("backpack") ||
    normalizedTitle.includes("tent") ||
    normalizedTitle.includes("essentials")
  ) {
    return "gear";
  }

  return "camp";
};

const getProductCategory = (product = {}) => {
  const title = normalizeTitle(product.title || "");
  const subtitle = normalizeTitle(product.subtitle || "");
  const combinedText = `${title} ${subtitle}`;

  if (
    combinedText.includes("powerbank") ||
    combinedText.includes("lamp") ||
    combinedText.includes("solar") ||
    combinedText.includes("batterij") ||
    combinedText.includes("elektr")
  ) {
    return "electronic-gear";
  }

  return "gear";
};

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductFilter, setSelectedProductFilter] =
    useState("all");
  const [selectedBlogCategory, setSelectedBlogCategory] =
    useState("all");

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
            const normalizedTitle = normalizeTitle(title);
            const imageUrl = normalizedTitle.includes("campfire")
              ? null
              : getImageUrl(item.fieldData);

            return {
              id: item.id,

              title,
              category: getBlogCategory(title),

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

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesFilter =
      selectedProductFilter === "all"
        ? true
        : getProductCategory(product) === selectedProductFilter;

    const matchesSearch =
      !query ||
      product.title?.toLowerCase().includes(query) ||
      product.subtitle?.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  const filteredBlogs = blogs.filter((blog) =>
    selectedBlogCategory === "all"
      ? true
      : blog.category === selectedBlogCategory
  );

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
          {productFilters.map((filter) => (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.productTab,
                selectedProductFilter === filter.value &&
                  styles.productTabActive,
              ]}
              onPress={() =>
                setSelectedProductFilter(filter.value)
              }
            >
              <Text
                style={[
                  styles.productTabText,
                  selectedProductFilter === filter.value &&
                    styles.productTabTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
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

          {filteredBlogs.length === 0 ? (
            <Text style={styles.emptyText}>
              Geen blogs gevonden in deze categorie.
            </Text>
          ) : null}
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

  list: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
    gap: 8,
    paddingHorizontal: 12,
    marginBottom: 18,
    justifyContent: "center",
    alignItems: "center",
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
    shadowColor: "#1F1914",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
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
