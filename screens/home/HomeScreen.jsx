import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const backgroundImage = require('../../assets/favicon.png');

const HomeScreen = () => (
  <>
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar backgroundColor={'rebeccapurple'} hidden={false} />
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>View Home Screen Here</Text>
          </TouchableOpacity>
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
  button: {
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 19,
  },
  safeAreaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight / 10000,
  },
  text: {
    color: 'rebeccapurple',
    fontSize: 32,
    textAlign: 'center',
  },
});

export default HomeScreen;
