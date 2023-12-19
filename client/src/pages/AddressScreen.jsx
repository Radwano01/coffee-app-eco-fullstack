import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useDispatch } from "react-redux";
import { SHIPPING_ADDRESS } from "../redux/Address";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSaveAddress = () => {
    dispatch(
      SHIPPING_ADDRESS({
        name: name, address: address, phoneNumber: phoneNumber
      })
    );
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("../assets/images/beansBackground2.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Enter Your Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          multiline
          numberOfLines={3}
          value={address}
          onChangeText={(text) => setAddress(text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          required
        />
        <Button title="Save Address" onPress={handleSaveAddress} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    color: "white",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
});

export default AddressScreen;
