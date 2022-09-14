import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const backgroundImage = require('../../assets/favicon.png');

const SearchScreen = () => (
  <>
    <ImageBackground source={backgroundImage} style={styles.image}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Search Screen</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'yellow',
    padding: 10,
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'rebeccapurple',
    fontSize: 32,
    textAlign: 'center',
  },
});

export default SearchScreen;
