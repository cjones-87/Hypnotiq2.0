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

import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const LoginScreen = ({ navigation }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const imageSource = isSecure
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
        <Text style={styles.text}>Login</Text>
        <View style={styles.sectionStyle}>
          <Image
            source={{
              uri: 'https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/344/external-email-accounting-smashingstocks-glyph-smashing-stocks.png',
            }}
            style={styles.imageStyle}
          />
          <TextInput
            onChangeText={(usernameOrEmail) =>
              setUsernameOrEmail(usernameOrEmail)
            }
            placeholder={'Enter username or email'}
            placeholderTextColor={'rebeccapurple'}
            style={{ flex: 1 }}
            underlineColorAndroid="transparent"
            value={usernameOrEmail}
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
            placeholder={'Password'}
            placeholderTextColor={'rebeccapurple'}
            secureTextEntry={isSecure}
            style={{ flex: 1 }}
            value={password}
            underlineColorAndroid="transparent"
          />
          <Pressable onPress={() => setIsSecure((current) => !current)}>
            <Image source={imageSource} style={styles.imageStyle} />
          </Pressable>
        </View>
        <View style={styles.sectionStyle}>
          <TouchableOpacity>
            <Entypo.Button
              color={'rebeccapurple'}
              name="login"
              onPress={() => navigation.navigate('Bottom Navigation Bar')}
              style={styles.icon}
            >
              Login
            </Entypo.Button>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionStyle}>
          <TouchableOpacity>
            <MaterialCommunityIcons.Button
              color={'rebeccapurple'}
              name="account-question-outline"
              onPress={() => navigation.navigate('Forgot Password Screen')}
              style={styles.icon}
            >
              Forgot Password
            </MaterialCommunityIcons.Button>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  icon: {
    backgroundColor: 'pink',
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
    tintColor: 'rebeccapurple',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: 'black',
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    borderWidth: 0.5,
    borderColor: 'rebeccapurple',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  text: {
    color: 'rebeccapurple',
    fontSize: 42,
  },
});

export default LoginScreen;
