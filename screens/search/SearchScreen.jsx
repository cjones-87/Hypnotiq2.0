import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import SearchBar from '../../components/search/SearchBar';
import Browse from '../../components/search/Browse';
const backgroundImage = require('../../assets/favicon.png');

const SearchScreen = () => (
  <>
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar backgroundColor={'rebeccapurple'} hidden={false} />
        <View>
          <SearchBar />
          <Browse />
        </View>
      </SafeAreaView>
    </ImageBackground>
  </>
);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  container: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  safeAreaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight / 10000,
  },
});

export default SearchScreen;
