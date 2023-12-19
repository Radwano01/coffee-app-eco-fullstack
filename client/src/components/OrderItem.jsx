import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

const OrderItem = ({ item }) => {
  return (
    <View>
      <Text style={styles.text}>Name: {item.name}</Text>
      <Text style={styles.text}>Price: {item.price}</Text>
      <Text style={styles.text}>Size: {item.size}</Text>
      <Text style={styles.text}>Quantity: {item.cartTotalQuantity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text:{
    fontWeight:"bold",
    fontSize:18,
    color:"white"
  },
})

export default OrderItem;
