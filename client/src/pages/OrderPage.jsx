import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from "react-native";
import OrderItem from "../components/OrderItem";
import axios from "axios";
import AddressComponent from "../components/AddressComponent";

const OrderPage = () => {
  const [items, setItems] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://coffee-api-3xh6.onrender.com/orders/get-orders"
        );
        if (response && response.data) {
          const data = response.data[0];

          const parsedItems = JSON.parse(data.items);
          const parsedAddress = JSON.parse(data.address);

          setItems(parsedItems);
          setAddress(parsedAddress);
        } else {
          console.log("No data");
        }
      } catch (err) {
        console.error("ERROR:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <ImageBackground
        source={require("../assets/images/beansBackground2.png")}
        style={styles.background}
      >
        <Text style={styles.title}>Ordered Items:</Text>
        <View style={styles.content}>
          <FlatList
            data={items}
            keyExtractor={(item, index) =>
              item && item.id ? item.id.toString() : index.toString()
            }
            renderItem={({ item }) => <OrderItem item={item} />}
          />
          <FlatList
            data={address}
            keyExtractor={(item, index) =>
              item && item.id ? item.id.toString() : index.toString()
            }
            renderItem={({ item }) => <AddressComponent address={item} />}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  background: {
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 16,
    width: "100%",
    height: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
});

export default OrderPage;
