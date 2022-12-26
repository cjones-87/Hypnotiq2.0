import React, { useEffect, useState } from 'react';

import { firebase } from '../../firebase';
import MusicPlayer from '../../screens/music/musicPlayer/MusicPlayer';

import {
  Button,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import color from '../../misc/color';

const backgroundImage = require('../../assets/Home.png');

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log('User does not exist');
        }
      })
      .catch((error) => console.log(error.message));
  }, []);

  const handleSignOut = () => firebase.auth().signOut();

  const changePassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        alert('Password reset email sent');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <SafeAreaView style={styles.safeAreaView}>
          <StatusBar backgroundColor={color.ACTIVE_BG} hidden={false} />

          <View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Howdy, {name.displayName}</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Welcome to</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Hypnotiq Musiq 2.0</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.flexRow}>
            <View style={[styles.sectionStyle, { margin: 5 }]}>
              <TouchableOpacity style={styles.button}>
                <MaterialCommunityIcons.Button
                  color={color.ACTIVE_BG}
                  name="lock-question"
                  onPress={() => changePassword()}
                  style={styles.icon}
                >
                  New Password
                </MaterialCommunityIcons.Button>
              </TouchableOpacity>
            </View>

            <View style={[styles.sectionStyle, { margin: 5 }]}>
              <TouchableOpacity style={styles.button}>
                <MaterialCommunityIcons.Button
                  color={color.ACTIVE_BG}
                  onPress={handleSignOut}
                  name="logout"
                  style={styles.icon}
                >
                  Logout
                </MaterialCommunityIcons.Button>
              </TouchableOpacity>
            </View>
          </View>

          {/* <MusicPlayer /> */}
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    width: width,
  },
  button: {
    alignItems: 'center',
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 20,
  },
  icon: { justifyContent: 'center', width: 150 },
  safeAreaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight / 10000,
  },
  text: {
    color: color.ACTIVE_BG,
    fontSize: 32,
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default HomeScreen;
