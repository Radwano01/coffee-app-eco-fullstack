import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AddressComponent = ({ address }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>name: {address.name}</Text>
      <Text style={styles.text}>address: {address.address}</Text>
      <Text style={styles.text}>Phone Number: {address.phoneNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    padding: 3,
  },
});

export default AddressComponent;
