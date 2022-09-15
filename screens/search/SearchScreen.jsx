import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import SearchBar from '../../components/search/SearchBar';
import Browse from '../../components/search/Browse';
const backgroundImage = require('../../assets/favicon.png');

const SearchScreen = () => (
  <>
    <ImageBackground source={backgroundImage} style={styles.image}>
      <SafeAreaView style={{ flex: 1 }}>
        <SearchBar />
        <Browse />
      </SafeAreaView>
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
    justifyContent: 'center',
    alignItems: 'center',
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
