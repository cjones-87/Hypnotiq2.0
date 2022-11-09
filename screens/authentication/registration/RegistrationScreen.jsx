import React, { useState } from 'react';

import { firebase } from '../../../firebase';

import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import GenderRadioButton from '../../../components/authentication/registration/GenderRadioButton';
import DOBpicker from '../../../components/authentication/registration/DOBpicker';

import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

import color from '../../../misc/color';

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const registerUser = async (email, password, username) => {
    if (password === confirmPassword && email === confirmEmail) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateProfile({ displayName: username })
            .then(() => {
              firebase
                .auth()
                .currentUser.sendEmailVerification({
                  handleCodeInApp: true,
                  url: 'https://hypnotiq-2-0.firebaseapp.com',
                })
                .then(() => {
                  alert('Verification email sent');
                })
                .then(() => {
                  firebase
                    .firestore()
                    .collection('users')
                    .doc(firebase.auth().currentUser.uid)
                    .set({ email, password, displayName: username });
                })
                .then(() => navigation.navigate('Bottom Navigation Bar'))
                .catch((error) => {
                  alert(error.message);
                });
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const [isSecureText, setIsSecureText] = useState(true);
  const toggleIsSecureText = () => setIsSecureText((current) => !current);

  const [isSecureTextConfirm, setIsSecureTextConfirm] = useState(true);
  const toggleIsSecureTextConfirm = () =>
    setIsSecureTextConfirm((current) => !current);

  const passwordImageSource = isSecureText
    ? {
        uri: 'https://img.icons8.com/dotty/2x/visible.png',
      }
    : {
        uri: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/2x/external-eye-devices-flatart-icons-outline-flatarticons.png',
      };

  const passwordImageSourceConfirm = isSecureTextConfirm
    ? {
        uri: 'https://img.icons8.com/dotty/2x/visible.png',
      }
    : {
        uri: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/2x/external-eye-devices-flatart-icons-outline-flatarticons.png',
      };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <StatusBar backgroundColor={color.ACTIVE_BG} hidden={false} />
        <Text style={styles.text}>Register</Text>
        <View style={styles.sectionStyle}>
          <Image
            source={{
              uri: 'https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/344/external-email-accounting-smashingstocks-glyph-smashing-stocks.png',
            }}
            style={styles.imageStyle}
          />
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            onChangeText={(email) => setEmail(email)}
            placeholder={'Enter account email'}
            placeholderTextColor={color.ACTIVE_BG}
            style={{ flex: 1 }}
            underlineColorAndroid="transparent"
            value={email}
          />
        </View>
        <View style={styles.sectionStyle}>
          <Image
            source={{
              uri: 'https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/344/external-email-accounting-smashingstocks-glyph-smashing-stocks.png',
            }}
            style={styles.imageStyle}
          />
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            onChangeText={(confirmEmail) => setConfirmEmail(confirmEmail)}
            placeholder={'Confirm account email'}
            placeholderTextColor={color.ACTIVE_BG}
            style={{ flex: 1 }}
            underlineColorAndroid="transparent"
            value={confirmEmail}
          />
        </View>
        <View style={styles.sectionStyle}>
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-filled/2x/password.png',
            }}
            style={styles.imageStyle}
          />
          <TextInput
            autoCapitalize="none"
            autoComplete="password"
            onChangeText={(password) => setPassword(password)}
            placeholder={'Create password'}
            placeholderTextColor={color.ACTIVE_BG}
            secureTextEntry={isSecureText}
            style={{ flex: 1 }}
            underlineColorAndroid="transparent"
            value={password}
          />
          <Pressable onPress={toggleIsSecureText}>
            <Image source={passwordImageSource} style={styles.imageStyle} />
          </Pressable>
        </View>
        <View style={styles.sectionStyle}>
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-filled/2x/password.png',
            }}
            style={styles.imageStyle}
          />
          <TextInput
            autoCapitalize="none"
            autoComplete="password"
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
            placeholder={'Confirm password'}
            placeholderTextColor={color.ACTIVE_BG}
            secureTextEntry={isSecureTextConfirm}
            style={{ flex: 1 }}
            underlineColorAndroid="transparent"
            value={confirmPassword}
          />
          <Pressable onPress={toggleIsSecureTextConfirm}>
            <Image
              source={passwordImageSourceConfirm}
              style={styles.imageStyle}
            />
          </Pressable>
        </View>
        <View style={styles.sectionStyle}>
          <Image
            source={{
              uri: 'https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/2x/external-user-user-tanah-basah-glyph-tanah-basah-3.png',
            }}
            style={styles.imageStyle}
          />
          <TextInput
            onChangeText={(username) => setUsername(username)}
            placeholder={'Profile username'}
            placeholderTextColor={color.ACTIVE_BG}
            style={{ flex: 1 }}
            underlineColorAndroid={'transparent'}
            value={username}
          />
        </View>
        {/* <View style={styles.sectionStyle}>
          <GenderRadioButton />
        </View>
        <View style={styles.sectionStyle}>
          <DOBpicker />
        </View> */}
        <View style={[styles.sectionStyle, { marginTop: 100, width: '40%' }]}>
          <TouchableOpacity>
            <Ionicons.Button
              color={color.ACTIVE_BG}
              name="enter"
              onPress={() => registerUser(email, password, username)}
              style={styles.icon}
            >
              Complete
            </Ionicons.Button>
          </TouchableOpacity>
        </View>

        <View style={[styles.sectionStyle, { marginTop: 100, width: '40%' }]}>
          <TouchableOpacity>
            <Entypo.Button
              color={color.ACTIVE_BG}
              name="login"
              onPress={() => navigation.navigate('Login Screen')}
              style={styles.icon}
            >
              Login Here
            </Entypo.Button>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  helpfulText: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: -15,
  },
  icon: {
    backgroundColor: 'pink',
  },
  imageStyle: {
    alignItems: 'center',
    height: 25,
    margin: 5,
    padding: 10,
    resizeMode: 'stretch',
    tintColor: color.ACTIVE_BG,
    width: 25,
  },
  safeAreaView: {
    backgroundColor: 'black',
    flex: 1,
  },
  sectionStyle: {
    alignItems: 'center',
    backgroundColor: 'pink',
    borderColor: color.ACTIVE_BG,
    borderRadius: 5,
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    color: color.ACTIVE_BG,
    fontSize: 42,
    margin: 10,
  },
});

export default RegistrationScreen;
