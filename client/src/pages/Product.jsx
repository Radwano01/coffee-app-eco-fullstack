import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftCircleIcon,
  MinusIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import { ShoppingBag } from "react-native-feather";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../redux/cartItems";

const ios = Platform.OS === "ios";

export default function Product(props) {
  const item = props.route.params;
  const [size, setSize] = useState("small");
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleQuantityPlus = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityMinus = () => {
    setQuantity((prev) => (prev - 1 === 0 ? (prev = 1) : prev - 1));
  };

  const handleAddToCard = (item) => {
    dispatch(
      ADD_TO_CART({
        item: {
          name: item.name,
          price: item.price,
          size: size,
        },
        quantity: quantity,
      })
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/beansBackground2.png")}
        style={styles.background}
      />
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftCircleIcon size={50} strokeWidth={1.2} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shoppingBagButton}
            onPress={() => navigation.navigate("Cart")}
          >
            <ShoppingBag size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.productImageContainer}>
          <Image source={item.image} style={styles.productImage} />
        </View>
        <View style={styles.starRatingContainer}>
          <StarIcon size={styles.starIcon.size} color={styles.starIcon.color} />
          <Text style={styles.starRatingText}>{item.stars}</Text>
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>$ {item.price}</Text>
        </View>
        <View style={styles.coffeeSizeContainer}>
          <Text style={styles.coffeeSizeTitle}>Coffee size</Text>
          <View style={styles.coffeeSizeButtonsContainer}>
            <TouchableOpacity
              onPress={() => setSize("small")}
              style={[
                styles.coffeeSizeButton,
                {
                  backgroundColor:
                    size === "small" ? "#d4a574" : "rgba(0,0,0,0.07)",
                },
              ]}
            >
              <Text
                style={[
                  styles.coffeeSizeButtonText,
                  { color: size === "small" ? "white" : "gray" },
                ]}
              >
                Small
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSize("medium")}
              style={[
                styles.coffeeSizeButton,
                {
                  backgroundColor:
                    size === "medium" ? "#d4a574" : "rgba(0,0,0,0.07)",
                },
              ]}
            >
              <Text
                style={[
                  styles.coffeeSizeButtonText,
                  { color: size === "medium" ? "white" : "gray" },
                ]}
              >
                Medium
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSize("large")}
              style={[
                styles.coffeeSizeButton,
                {
                  backgroundColor:
                    size === "large" ? "#d4a574" : "rgba(0,0,0,0.07)",
                },
              ]}
            >
              <Text
                style={[
                  styles.coffeeSizeButtonText,
                  { color: size === "large" ? "white" : "gray" },
                ]}
              >
                Large
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About</Text>
          <Text style={styles.aboutText}>{item.description}</Text>
        </View>
        <View style={styles.volumeContainer}>
          <View style={styles.volumeTextContainer}>
            <Text style={styles.volumeText}>Volume </Text>
            <Text style={styles.volumeValue}>{item.volume}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton}>
              <MinusIcon
                size={styles.quantityIcon.size}
                strokeWidth={styles.quantityIcon.strokeWidth}
                color={"#3C2A21"}
                onPress={handleQuantityMinus}
              />
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton}>
              <PlusIcon
                size={styles.quantityIcon.size}
                strokeWidth={styles.quantityIcon.strokeWidth}
                color={"#3C2A21"}
                onPress={handleQuantityPlus}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Buy now button */}
        <View style={styles.buyNowButtonsContainer}>
          <TouchableOpacity style={styles.buyNowButton}>
            <Text
              style={styles.buyNowButtonText}
              onPress={() => handleAddToCard(item)}
            >
              Buy now
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: 300,
    width: 300,
    width: "100%",
    position: "absolute",
  },
  headerButtons: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    borderRadius: 50,
  },
  productImageContainer: {
    shadowColor: "#8c5319",
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.9,
    flexDirection: "row",
    justifyContent: "center",
  },
  productImage: {
    height: 100,
    width: 100,
    marginTop: ios ? 0 : 40,
  },
  starRatingContainer: {
    backgroundColor: "#d4a574",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    padding: 1,
    paddingLeft: 2,
    opacity: 0.9,
    width: "25%",
  },
  starIcon: {
    size: 15,
    color: "white",
  },
  starRatingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  productDetails: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    color: "#3C2A21",
    fontSize: 30,
    fontWeight: "bold",
  },
  productPrice: {
    color: "#3C2A21",
    fontSize: 20,
    fontWeight: "bold",
  },
  coffeeSizeContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  coffeeSizeTitle: {
    color: "#3C2A21",
    fontSize: 20,
    fontWeight: "bold",
  },
  coffeeSizeButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coffeeSizeButton: {
    padding: 16,
    paddingLeft: 25,
    paddingRight: 25,
    marginRight: 2,
    borderRadius: 9,
  },
  coffeeSizeButtonText: {
    fontWeight: "bold",
  },
  aboutContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  aboutTitle: {
    color: "#3C2A21",
    fontSize: 20,
    fontWeight: "bold",
  },
  aboutText: {
    color: "gray",
    fontSize: 16,
  },
  volumeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 2,
  },
  volumeTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 4,
  },
  volumeText: {
    fontSize: 16,
    color: "gray",
    fontWeight: "600",
    opacity: 0.6,
  },
  volumeValue: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 9,
    padding: 1,
    paddingLeft: 4,
    paddingRight: 4,
  },
  quantityButton: {
    padding: 16,
    borderRadius: 9,
  },
  quantityIcon: {
    size: 20,
    strokeWidth: 3,
  },
  quantityValue: {
    color: "#3C2A21",
    fontWeight: "bold",
    fontSize: 20,
  },
  buyNowButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  shoppingBagButton: {
    padding: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "white",
  },
  buyNowButton: {
    backgroundColor: "#d4a574",
    padding: 16,
    borderRadius: 9,
    flex: 1,
  },
  buyNowButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});
