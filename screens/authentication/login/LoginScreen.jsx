import React, { useEffect, useState } from 'react';

import { firebase } from '../../../firebase';

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Checkbox from 'expo-checkbox';

import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

import color from '../../../misc/color';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isChecked, setIsChecked] = useState(false);
  const toggleIsChecked = () => {
    setIsChecked((current) => (current = !current));
  };

  const loginUser = async (email, password) => {
    if (isChecked) {
      try {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(() => {
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then((userCredential) => (currentUser = userCredential.user));
          });

        navigation.replace('Bottom Navigation Bar');
      } catch (error) {}
    } else {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => (currentUser = userCredential.user));

        navigation.replace('Bottom Navigation Bar');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const [isSecureText, setIsSecureText] = useState(true);
  const toggleIsSecureText = () => {
    setIsSecureText((current) => !current);
  };

  const passwordImageSource = isSecureText
    ? {
        uri: 'https://img.icons8.com/dotty/2x/visible.png',
      }
    : {
        uri: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/2x/external-eye-devices-flatart-icons-outline-flatarticons.png',
      };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor={color.ACTIVE_BG} hidden={false} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { paddingTop: 200 }]}
      >
        <Text style={styles.text}>Login</Text>

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
            onChangeText={(email) => {
              setEmail(email.trim());
            }}
            placeholder={'Enter email'}
            placeholderTextColor={color.ACTIVE_BG}
            style={{ flex: 1 }}
            underlineColorAndroid="transparent"
            value={email}
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
            onChangeText={(password) => setPassword(password.trim())}
            placeholder={'Password'}
            placeholderTextColor={color.ACTIVE_BG}
            secureTextEntry={!isSecureText}
            style={{ flex: 1 }}
            underlineColorAndroid="transparent"
            value={password}
          />
          <Pressable onPress={toggleIsSecureText}>
            <Image source={passwordImageSource} style={styles.imageStyle} />
          </Pressable>
        </View>

        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {isChecked ? (
            <Text style={{ color: 'pink' }}>Password Will Be Saved</Text>
          ) : (
            <Text style={{ color: 'pink' }}>Save Password?</Text>
          )}
          <Checkbox
            color={isChecked ? color.ACTIVE_BG : 'pink'}
            onValueChange={toggleIsChecked}
            style={styles.checkbox}
            value={isChecked}
          />
        </View>

        <View style={[styles.sectionStyle, { marginTop: 100, width: '40%' }]}>
          <TouchableOpacity>
            <Entypo.Button
              color={color.ACTIVE_BG}
              name="login"
              onPress={() => {
                loginUser(email, password);
              }}
              style={styles.icon}
            >
              Submit
            </Entypo.Button>
          </TouchableOpacity>
        </View>

        <View style={[styles.sectionStyle, { width: '40%' }]}>
          <TouchableOpacity>
            <FontAwesome5.Button
              color={color.ACTIVE_BG}
              name="question-circle"
              onPress={() => navigation.navigate('Forgot Password Screen')}
              style={styles.icon}
            >
              Forgot Password
            </FontAwesome5.Button>
          </TouchableOpacity>
        </View>
        <View style={[styles.sectionStyle, { marginTop: 100, width: '40%' }]}>
          <TouchableOpacity>
            <Ionicons.Button
              color={color.ACTIVE_BG}
              name="create"
              onPress={() => navigation.navigate('Registration Screen')}
              style={styles.icon}
            >
              Register Here
            </Ionicons.Button>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  checkbox: { margin: 10 },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  icon: {
    backgroundColor: 'pink',
    width: '100%',
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

export default LoginScreen;
