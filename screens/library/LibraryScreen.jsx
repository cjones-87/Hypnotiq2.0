import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const backgroundImage = require('../../assets/favicon.png');

const LibraryScreen = () => (
  <>
    <ImageBackground source={backgroundImage} style={styles.image}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>View Liked Audio Here</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  </>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'orange',
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

export default LibraryScreen;
