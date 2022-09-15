import React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';

const renderCategoryList = ({ item }) => (
  <TouchableOpacity>
    <Image
      source={item}
      style={{
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').height / 5,
        borderWidth: 2,
        borderColor: 'yellow',
        resizeMode: 'contain',
        margin: 25,
      }}
    />
  </TouchableOpacity>
);
export default renderCategoryList;
