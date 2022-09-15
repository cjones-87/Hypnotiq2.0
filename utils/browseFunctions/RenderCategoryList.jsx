import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const renderCategoryList = ({ item }) => (
  <TouchableOpacity>
    <Text style={styles.text}>Category</Text>
    <Image source={item} style={styles.image} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').height / 6,
    borderWidth: 2,
    borderColor: 'yellow',
    borderRadius: 20,
    resizeMode: 'contain',
    margin: 19,
  },
  text: {
    alignItems: 'center',
    color: 'yellow',
    justifyContent: 'center',
    textAlign: 'center',
    textShadowColor: 'red',
    textShadowOffset: { width: 15, height: 15 },
  },
});
export default renderCategoryList;
