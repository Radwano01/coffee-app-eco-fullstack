import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { categories } from "../data/cafes.js";
import Carousel from "react-native-snap-carousel";
import CoffeeCard from "../components/CoffeeCard";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { coffeeItems as data } from "../data/cafes.js";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [coffeeItems, setCoffeeItems] = useState(null);

  const navigation = useNavigation()

  useEffect(() => {
    setCoffeeItems(data);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />

      <Image
        source={require("../assets/images/beansBackground1.png")}
        style={styles.backgroundImage}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../assets/images/avatar.png")}
            style={styles.avatar}
          />
          <TouchableOpacity onPress={()=> navigation.navigate("Orders")}>
            <BellIcon size={27} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput placeholder="Search" style={styles.input} />
            <TouchableOpacity style={styles.searchButton}>
              <MagnifyingGlassIcon size={25} strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.categoriesContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const isActive = item.id === activeCategory;
              const activeTextClass = isActive
                ? styles.activeText
                : styles.inactiveText;
              return (
                <TouchableOpacity
                  onPress={() => setActiveCategory(item.id)}
                  style={{
                    ...styles.categoryButton,
                    backgroundColor: isActive ? "#d4a574" : "rgba(0,0,0,0.07)",
                  }}
                >
                  <Text style={{ ...styles.categoryText, ...activeTextClass }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </SafeAreaView>
      <View style={styles.coffeeCardsContainer}>
        <View style={styles.carouselContainer}>
          <Carousel
            containerCustomStyle={styles.carouselContainer}
            data={coffeeItems}
            renderItem={({ item }) => <CoffeeCard item={item} />}
            firstItem={1}
            loop
            inactiveSlideScale={0.75}
            inactiveSlideOpacity={0.75}
            sliderWidth={width}
            itemWidth={width * 0.63}
            slideStyle={{ display: "flex", alignItems: "center" }}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
  },
  backgroundImage: {
    height: height * 0.2,
    width: "100%",
    position: "absolute",
    top: -5,
    opacity: 0.1,
  },
  safeAreaView: {
    marginBottom: ios ? -8 : 0,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 4,
  },
  avatar: {
    height: 39,
    width: 39,
    borderRadius: 50,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchContainer: {
    marginHorizontal: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginTop: height * 0.06,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    padding: 4,
    backgroundColor: "#e6e6e6",
  },
  input: {
    flex: 1,
    paddingHorizontal: 4,
    fontWeight: "bold",
    color: "gray",
  },
  searchButton: {
    borderRadius: 25,
    padding: 2,
    backgroundColor: "#d4a574",
  },
  categoriesContainer: {
    paddingHorizontal: 5,
    marginTop: 6,
  },
  categoryButton: {
    padding: 7,
    paddingHorizontal: 5,
    marginRight: 5,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  categoryText: {
    fontWeight: "bold",
  },
  coffeeCardsContainer: {
    overflow: "visible",
    justifyContent: "center",
    flex: 1,
    marginTop: ios ? 10 : 0,
  },
  carouselContainer: {
    overflow: "visible",
  },
});
