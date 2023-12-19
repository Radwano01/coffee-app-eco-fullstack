import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { CLEAR_CART } from "../redux/cartItems";
import { CLEAR_SHIPPING_ADDRESS } from "../redux/Address";

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const address = useSelector((state)=> state.address.address)
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const calculateTotal = () => {
      const amount = cartItems?.reduce(
        (total, item) =>
          total + item.price * item.cartTotalQuantity,
        0
      );
      setPrice(amount);
    };
    calculateTotal();
  }, []);
  const handleSubmit = async () => {
    if(address !== undefined && address !== null && address.length !== 0){
      let arr = []
      await cartItems?.map((data)=>{
        return arr.push(data)
      })
      try {
        const response = await axios.post(
          "https://coffee-api-3xh6.onrender.com/orders/order",{
            price:price,
            items:arr,
            address:address
          }
        );
        if (response.data) {
          navigation.navigate("Home");
          dispatch(CLEAR_CART());
          dispatch(CLEAR_SHIPPING_ADDRESS())
        } else {
          console.error("Unsuccessful response:", response);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }else{
      navigation.navigate("Address")
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/beansBackground2.png")}
        style={styles.background}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Shopping Cart</Text>
      </View>
      {cartItems ? (
        <View style={styles.cartItems}>
          {cartItems.map((item, index) => (
            <View key={index} style={styles.cartItems}>
              <Text style={styles.text}>Name: {item.name}</Text>
              <Text style={styles.text}>Size: {item.size}</Text>
              <Text style={styles.text}>
                Quantity: {item.cartTotalQuantity}
              </Text>
              <Text style={styles.text}>
                Price: ${item.price * item.cartTotalQuantity}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        "No Products"
      )}
      <View style={styles.total}>
        <Text style={styles.text}>Total: ${price}</Text>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => handleSubmit()}
      >
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  background: {
    height: "150%",
    width: 500,
    position: "absolute",
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  cartItems: {
    marginBottom: 25,
  },
  cartItem: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: "#d4a574",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default Cart;
