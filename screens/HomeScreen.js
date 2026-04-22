import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Switch,
} from "react-native";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";

const colors = {
  pine: "#2F4A3C",
  earth: "#807157",
  sand: "#E8DFD1",
  mist: "#F5F1E8",
  bark: "#3F3328",
  ember: "#C96B3B",
};

const productOptions = [
  { label: "Alles", value: "all" },
  { label: "Gear", value: "gear" },
  { label: "Elektronische gear", value: "electronic-gear" },
];

const sortOptions = [
  { label: "Prijs laag-hoog", value: "low-high" },
  { label: "Prijs hoog-laag", value: "high-low" },
  { label: "Midden prijs", value: "middle" },
  { label: "Naam A-Z", value: "name-a-z" },
  { label: "Naam Z-A", value: "name-z-a" },
];

const blogTabs = [
  { label: "Alles", value: "all" },
  { label: "Kamperen", value: "camp" },
  { label: "Gear", value: "gear" },
  { label: "Kampvuur", value: "fire" },
];

const blogTexts = {
  campingplek:
    "De juiste campingplek kiezen maakt het verschil tussen een gewone nacht en een onvergetelijk avontuur. Een vlak stuk grond, beschutting tegen de wind en het geluid van de natuur om je heen - daar begint het echte buitenleven.\n\nHet gaat niet alleen om waar je slaapt, maar om de ervaring. De zonsopgang boven de bergen, het kampvuur dat langzaam uitdooft en de rust van de wildernis.\n\nEen goede plek geeft je ruimte om te ademen, te ontspannen en op te laden.\n\nKies slim. Geniet meer.",
  droog:
    "Regen hoort bij het buitenleven. Donkere wolken trekken over de bergen en de eerste druppels vallen op je tentdoek. Maar met de juiste voorbereiding blijft je avontuur doorgaan.\n\nWaterdichte gear, een goed geplaatste tent en slimme bescherming maken het verschil tussen natte chaos en comfortabel kamperen.\n\nWant zelfs in de regen blijft de natuur indrukwekkend.\n\nBlijf droog. Blijf sterk. Ga verder.",
  tent:
    "Na een lange hike wil je geen tijd verliezen met je tent. De wind trekt aan het doek, de zon zakt langzaam achter de bergen en je weet dat elke minuut telt.\n\nMet de juiste voorbereiding en een paar simpele tricks staat je tent sneller dan je denkt. Harings eerst, stokken klaar, alles binnen handbereik.\n\nEen goed opgezet kamp betekent rust, warmte en een plek om de dag af te sluiten.\n\nZet op. Kom tot rust. Geniet van het moment.",
  campfire:
    "Een kampvuur maken is meer dan een paar takken aansteken. Het vraagt geduld, aandacht en respect voor de natuur. Het hout knispert, de vlammen dansen en langzaam verspreidt de warmte zich door de koude avondlucht.\n\nHet vuur brengt rust na een lange dag wandelen. Het is het moment om te stoppen, adem te halen en te genieten van de stilte van de natuur.\n\nEen goed kampvuur is niet alleen warmte. Het is het hart van het avontuur.\n\nBlijf ontdekken. Blijf genieten.",
  firstTrip:
    "Alleen op pad gaan vraagt moed. Geen drukte, geen afleiding - alleen jij en de natuur. Elke stap door het bos, elke berg die je beklimt, brengt je dichter bij jezelf.\n\nAls solo explorer leer je vertrouwen op je eigen kracht. Je beslissingen, je voorbereiding en je doorzettingsvermogen maken het verschil.\n\nDe stilte van de natuur laat je nadenken, groeien en sterker terugkomen.\n\nSoms moet je alleen gaan om echt ver te komen.",
  backpack:
    "Een ruwe bergtop bereik je niet zomaar. Het vraagt voorbereiding, discipline en vooral doorzettingskracht. De wind wordt sterker, het pad steiler en elke stap voelt zwaarder, maar juist daar wordt het verschil gemaakt.\n\nDoorzetten wanneer je benen branden. Focus houden wanneer het uitzicht nog verborgen is. Vertrouwen op je uitrusting en op jezelf. Dat is waar echte avonturiers zich onderscheiden.\n\nDe top is geen eindpunt. Het is het bewijs dat je grenzen hebt verlegd.\n\nBlijf klimmen. Blijf groeien. Ga verder.",
};

const getProductCategory = (title, subtitle) => {
  const text = `${title} ${subtitle}`.toLowerCase();
  if (
    text.includes("powerbank") ||
    text.includes("lamp") ||
    text.includes("solar") ||
    text.includes("batterij") ||
    text.includes("elektr")
  ) {
    return "electronic-gear";
  }
  return "gear";
};

const getBlogCategory = (title) => {
  const text = title.toLowerCase();
  if (text.includes("campfire") || text.includes("vuur")) return "fire";
  if (text.includes("backpack") || text.includes("tent") || text.includes("essentials")) return "gear";
  return "camp";
};

const getBlogContent = (title, content) => {
  const text = title.toLowerCase();
  if (text.includes("perfecte campingplek kiest")) return blogTexts.campingplek;
  if (text.includes("droog te blijven")) return blogTexts.droog;
  if (text.includes("sneller je tent")) return blogTexts.tent;
  if (text.includes("campfire safely")) return blogTexts.campfire;
  if (text.includes("first camping trip")) return blogTexts.firstTrip;
  if (text.includes("perfect backpack")) return blogTexts.backpack;
  if (content === "") return "In deze blog vind je extra tips en inspiratie voor je volgende outdoor avontuur.";
  return content;
};

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductFilter, setSelectedProductFilter] = useState("all");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("all");
  const [sortOption, setSortOption] = useState("low-high");
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [onlyElectronicGear, setOnlyElectronicGear] = useState(false);

  useEffect(() => {
    fetch("https://api.webflow.com/v2/sites/698c7fb2a269f43d1814eb3c/products", {
      headers: {
        Authorization: "Bearer 3b13bd0f07d7e57b05ba7431be014af0763ebe90a406731a7e4b201839980a68",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const productList = (data.items || []).map((item) => {
          const title = item.product.fieldData.name;
          const subtitle = item.product.fieldData.description || "";
          const price = (item.skus[0]?.fieldData.price?.value || 0) / 100;
          const imageUrl =
            item.skus[0]?.fieldData["main-image"]?.url || "https://via.placeholder.com/150";
          return {
            id: item.product.id,
            title,
            subtitle,
            price,
            category: getProductCategory(title, subtitle),
            image: { uri: imageUrl },
          };
        });
        setProducts(productList);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    fetch("https://api.webflow.com/v2/collections/699efbc02f270876dc903d10/items", {
      headers: {
        Authorization: "Bearer 3b13bd0f07d7e57b05ba7431be014af0763ebe90a406731a7e4b201839980a68",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const blogList = (data.items || []).map((item) => {
          const fieldData = item.fieldData || {};
          const title = fieldData.name || "Blog";
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
          let description = fieldData.summary || fieldData.description || "Klik om meer info te lezen.";
          let content =
            fieldData["post-body"] ||
            fieldData["blog-body"] ||
            fieldData.body ||
            fieldData.content ||
            fieldData.description ||
            fieldData.summary ||
            "";

          if (description.toLowerCase() === title.toLowerCase()) description = "Klik om meer info te lezen.";
          if (typeof content !== "string") content = String(content);
          content = content.replace(/<[^>]*>/g, " ").trim();
          content = getBlogContent(title, content);

          let image = { uri: "https://via.placeholder.com/150" };
          if (title.toLowerCase().includes("campfire")) {
            image = require("../assets/vuur.webp");
          } else if (imageUrl) {
            image = { uri: imageUrl };
          }

          return {
            id: item.id,
            title,
            description,
            content,
            category: getBlogCategory(title),
            image,
          };
        });
        setBlogs(blogList);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  let filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      product.title.toLowerCase().includes(query) ||
      product.subtitle.toLowerCase().includes(query);
    if (onlyElectronicGear) return product.category === "electronic-gear" && matchesSearch;
    if (selectedProductFilter === "all") return matchesSearch;
    return product.category === selectedProductFilter && matchesSearch;
  });

  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "low-high") return a.price - b.price;
    if (sortOption === "high-low") return b.price - a.price;
    if (sortOption === "name-a-z") return a.title.localeCompare(b.title);
    if (sortOption === "name-z-a") return b.title.localeCompare(a.title);
    return Math.abs(a.price - 100) - Math.abs(b.price - 100);
  });

  const filteredBlogs = blogs.filter((blog) => {
    if (selectedBlogCategory === "all") return true;
    return blog.category === selectedBlogCategory;
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ImageBackground source={require("../assets/hersection.jpg")} style={styles.hero} imageStyle={styles.heroImage}>
          <View style={styles.heroOverlay}>
            <View style={styles.heroTextBox}>
              <Text style={styles.heroTitle}>Gear Up For Your Nextr Adventure</Text>
            </View>
          </View>
        </ImageBackground>

        <Text style={styles.heading}>Outdoor Essentials</Text>
        <Text style={styles.subheading}>Alles voor je volgende avontuur in de natuur.</Text>

        <TextInput
          placeholder="Zoek een product..."
          placeholderTextColor="#8B7C68"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Alleen elektronische gear</Text>
          <Switch
            value={onlyElectronicGear}
            onValueChange={setOnlyElectronicGear}
            trackColor={{ false: "#CFC5B5", true: colors.earth }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Onze producten</Text>
          <Text style={styles.sectionCaption}>Geselecteerd voor kamperen, hiking en avonden bij het vuur.</Text>
        </View>

        <View style={styles.filterBox}>
          <Text style={styles.label}>Categorie</Text>
          <TouchableOpacity style={styles.selectButton} onPress={() => setShowCategoryOptions(!showCategoryOptions)}>
            <Text style={styles.selectText}>{productOptions.find((item) => item.value === selectedProductFilter)?.label}</Text>
            <Text style={styles.arrow}>{showCategoryOptions ? "▲" : "▼"}</Text>
          </TouchableOpacity>

          {showCategoryOptions && (
            <View style={styles.optionsBox}>
              {productOptions.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.optionButton}
                  onPress={() => {
                    setSelectedProductFilter(item.value);
                    setShowCategoryOptions(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.label}>Sorteer producten</Text>
          <TouchableOpacity style={styles.selectButton} onPress={() => setShowSortOptions(!showSortOptions)}>
            <Text style={styles.selectText}>{sortOptions.find((item) => item.value === sortOption)?.label}</Text>
            <Text style={styles.arrow}>{showSortOptions ? "▲" : "▼"}</Text>
          </TouchableOpacity>

          {showSortOptions && (
            <View style={styles.optionsBox}>
              {sortOptions.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.optionButton}
                  onPress={() => {
                    setSortOption(item.value);
                    setShowSortOptions(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
          <Text style={styles.sectionTitleCenter}>Onze blog</Text>
          <Text style={styles.blogCaption}>Tips, guides en inspiratie voor buitenmensen.</Text>

          <View style={styles.blogTabs}>
            {blogTabs.map((tab) => (
              <TouchableOpacity
                key={tab.value}
                style={[styles.blogTab, selectedBlogCategory === tab.value && styles.blogTabActive]}
                onPress={() => setSelectedBlogCategory(tab.value)}
              >
                <Text style={[styles.blogTabText, selectedBlogCategory === tab.value && styles.blogTabTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.blogList}>
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                onPress={() =>
                  navigation.navigate("Details", {
                    title: blog.title,
                    description: blog.content,
                    image: blog.image,
                    type: "blog",
                  })
                }
              />
            ))}
          </View>

          {filteredBlogs.length === 0 && (
            <Text style={styles.emptyText}>Geen blogs gevonden in deze categorie.</Text>
          )}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.mist },
  scrollContent: { paddingBottom: 28 },
  hero: { height: 280, width: "100%", marginBottom: 20, justifyContent: "center" },
  heroImage: { borderRadius: 0 },
  heroOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.28)", justifyContent: "center", alignItems: "center", paddingHorizontal: 24 },
  heroTextBox: { borderWidth: 3, borderColor: "rgba(255, 255, 255, 0.9)", paddingVertical: 24, paddingHorizontal: 18, width: "100%" },
  heroTitle: { color: "#FFFFFF", fontSize: 34, fontWeight: "800", textAlign: "center", lineHeight: 42, fontStyle: "italic" },
  heading: { color: colors.bark, fontSize: 28, fontWeight: "800", textAlign: "center", marginTop: 60, marginBottom: 8 },
  subheading: { color: colors.pine, textAlign: "center", marginBottom: 16, paddingHorizontal: 28, lineHeight: 22 },
  input: { margin: 12, backgroundColor: colors.sand, padding: 12, borderRadius: 14, borderWidth: 1, borderColor: "#D5C7B0", color: colors.bark },
  switchRow: { marginHorizontal: 12, marginBottom: 12, paddingHorizontal: 14, paddingVertical: 12, borderRadius: 14, backgroundColor: colors.sand, borderWidth: 1, borderColor: "#D5C7B0", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  switchText: { color: colors.bark, fontWeight: "600" },
  sectionHeader: { paddingHorizontal: 12, marginTop: 4, marginBottom: 12 },
  sectionTitle: { color: colors.bark, fontSize: 24, fontWeight: "800" },
  sectionTitleCenter: { color: colors.bark, fontSize: 24, fontWeight: "800", textAlign: "center" },
  sectionCaption: { color: colors.pine, marginTop: 4 },
  filterBox: { marginHorizontal: 12, marginBottom: 18, backgroundColor: colors.bark, borderRadius: 22, paddingTop: 22, paddingBottom: 22, paddingHorizontal: 20, borderWidth: 1, borderColor: "#6A5E4C" },
  label: { color: "#A9BCD0", fontSize: 13, fontWeight: "700", textTransform: "uppercase", marginTop: 12, marginBottom: 14 },
  selectButton: { backgroundColor: "#FFFFFF", borderRadius: 12, paddingVertical: 16, paddingHorizontal: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  selectText: { color: "#1F1F1F", fontSize: 16 },
  arrow: { color: "#1F1F1F", fontSize: 16 },
  optionsBox: { backgroundColor: "#FFFFFF", borderRadius: 12, marginTop: 10, marginBottom: 16, overflow: "hidden" },
  optionButton: { paddingVertical: 14, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: "#E7E1D6" },
  optionText: { color: "#1F1F1F", fontSize: 16 },
  list: { paddingHorizontal: 12, paddingBottom: 24, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  blogSection: { width: "100%", marginTop: 24, paddingHorizontal: 12 },
  blogCaption: { color: colors.pine, textAlign: "center", marginTop: 6, marginBottom: 18 },
  blogTabs: { flexDirection: "row", justifyContent: "space-between", marginBottom: 18, gap: 8 },
  blogTab: { flex: 1, backgroundColor: colors.sand, borderRadius: 999, paddingVertical: 11, alignItems: "center", borderWidth: 1, borderColor: "#D5C7B0" },
  blogTabActive: { backgroundColor: colors.bark, borderColor: colors.bark },
  blogTabText: { color: colors.bark, fontWeight: "700", fontSize: 13 },
  blogTabTextActive: { color: colors.mist },
  blogList: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  emptyText: { color: colors.pine, textAlign: "center", paddingVertical: 18 },
});

export default HomeScreen;
