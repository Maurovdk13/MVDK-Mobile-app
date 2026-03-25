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

const colors = {
  pine: "#2F4A3C",
  moss: "#5F6F52",
  earth: "#807157",
  sand: "#E8DFD1",
  mist: "#F5F1E8",
  bark: "#3F3328",
  ember: "#C96B3B",
};

const fallbackBlogImages = {
  "how to start a campfire safely": require("../assets/blog1.jpg"),
};

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

  if (fallbackBlogImages[title.trim().toLowerCase()]) {
    return fallbackBlogImages[title.trim().toLowerCase()];
  }

  if (normalizedTitle.includes("campfire")) {
    return require("../assets/blog1.jpg");
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
            const normalizedTitle = normalizeTitle(title);
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
    backgroundColor: colors.mist,
  },

  heading: {
    color: colors.bark,
    fontSize: 28,
    fontWeight: "800",
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
    backgroundColor: colors.sand,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D5C7B0",
    color: colors.bark,
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    alignItems: "center",
    backgroundColor: colors.earth,
    marginHorizontal: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
  },

  blogSection: {
    width: "100%",
    marginTop: 24,
  },

  blogHeading: {
    color: colors.bark,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
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
});

export default HomeScreen;
