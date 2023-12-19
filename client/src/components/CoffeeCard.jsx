import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StarIcon } from 'react-native-heroicons/solid';
import { PlusIcon } from 'react-native-heroicons/outline';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';

export default function CoffeeCard({ item }) {
  const navigation = useNavigation();

  return (
    <View style={styles.coffeeCardContainer}>
      <View style={styles.coffeeImageContainer}>
        <Image source={item.image} style={styles.coffeeImage} />
      </View>
      <View style={styles.coffeeDetailsContainer}>
        <View style={{ zIndex: 10 }}>
          <Text style={styles.coffeeName}>{item.name}</Text>
        </View>
        <View style={styles.starRatingContainer}>
          <StarIcon size={styles.starIcon.size} color={styles.starIcon.color} />
          <Text style={styles.starRatingText}>{item.stars}</Text>
        </View>
        <View style={styles.volumeContainer}>
          <View style={styles.volumeTextContainer}>
            <Text style={styles.volumeText}>Volume </Text>
            <Text style={styles.volumeValue}>{item.volume}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>$ {item.price}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Product', { ...item })}
            style={styles.addToCartButton}
          >
            <PlusIcon size={styles.plusIcon.size} strokeWidth={styles.plusIcon.strokeWidth} color={styles.plusIcon.color} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  coffeeCardContainer: {
    borderRadius: 40,
    backgroundColor: '#8c5319',
    height: ios ? height * 0.4 : height * 0.5,
    width: width * 0.65,
  },
  coffeeImageContainer: {
    shadowColor: 'black',
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 40 },
    shadowOpacity: 0.8,
    marginTop: ios ? -(height * 0.08) : 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  coffeeImage: {
    height: 70,
    width: 70,
  },
  coffeeDetailsContainer: {
    paddingHorizontal: 5,
    flex: 1,
    justifyContent: 'space-between',
    marginTop: ios ? 5 : 0,
  },
  coffeeName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    zIndex: 10,
    textAlign:"center",
  },
  starRatingContainer: {
    alignItems:"center",
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 1,
    paddingLeft: 2,
  },
  starIcon: {
    size: 15,
    color: 'white',
  },
  starRatingText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  volumeTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
  },
  volumeText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    opacity: 0.6,
  },
  volumeValue: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  priceContainer: {
    backgroundColor: ios ? '#8c5319' : 'transparent',
    shadowColor: ios ? '#8c5319' : 'transparent',
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 40 },
    shadowOpacity: ios ? 0.8 : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  priceText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  addToCartButton: {
    shadowColor: 'black',
    shadowRadius: 40,
    shadowOffset: { width: -20, height: -10 },
    shadowOpacity: 1,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 9999,
  },
  plusIcon: {
    size: 25,
    strokeWidth: 2,
    color: '#8c5319',
  },
});