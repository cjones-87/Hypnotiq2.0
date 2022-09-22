import React, { useState } from 'react';

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

import Entypo from '@expo/vector-icons/Entypo';

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

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
        <StatusBar backgroundColor={'rebeccapurple'} hidden={false} />
        <Text style={styles.text}>Register</Text>
        <View style={styles.sectionStyle}>
          <Image
            source={{
              uri: 'https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/344/external-email-accounting-smashingstocks-glyph-smashing-stocks.png',
            }}
            style={styles.imageStyle}
          />
          <TextInput
            onChangeText={(email) => setEmail(email)}
            placeholder={'Enter account email'}
            placeholderTextColor={'rebeccapurple'}
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
            onChangeText={(confirmEmail) => setConfirmEmail(confirmEmail)}
            placeholder={'Confirm account email'}
            placeholderTextColor={'rebeccapurple'}
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
            onChangeText={(password) => setPassword(password)}
            placeholder={'Create password'}
            placeholderTextColor={'rebeccapurple'}
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
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
            placeholder={'Confirm password'}
            placeholderTextColor={'rebeccapurple'}
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
            placeholderTextColor={'rebeccapurple'}
            style={{ flex: 1 }}
            underlineColorAndroid={'transparent'}
            value={username}
          />
        </View>
        <View style={styles.sectionStyle}>
          <GenderRadioButton width={Dimensions.get('window').width} />
        </View>
        {/* {} */}
        {/* {} */}
        <View style={styles.helpfulText}>
          <Text style={{ color: 'rebeccapurple' }}>Need to login?</Text>
        </View>
        <View style={styles.sectionStyle}>
          <TouchableOpacity>
            <Entypo.Button
              color={'rebeccapurple'}
              name="login"
              onPress={() => navigation.navigate('Login Screen')}
              style={styles.icon}
            >
              Login
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
    tintColor: 'rebeccapurple',
    width: 25,
  },
  safeAreaView: {
    backgroundColor: 'black',
    flex: 1,
  },
  sectionStyle: {
    alignItems: 'center',
    backgroundColor: 'pink',
    borderColor: 'rebeccapurple',
    borderRadius: 5,
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    color: 'rebeccapurple',
    fontSize: 42,
    margin: 10,
  },
});

export default RegistrationScreen;
