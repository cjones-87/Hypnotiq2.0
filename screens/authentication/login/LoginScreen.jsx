import React, { useState } from 'react';

import {
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
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            onChangeText={(email) => setEmail(email)}
            placeholder={'Enter email'}
            placeholderTextColor={'rebeccapurple'}
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
            onChangeText={(password) => setPassword(password)}
            placeholder={'Password'}
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
            <FontAwesome5.Button
              color={'rebeccapurple'}
              name="question-circle"
              onPress={() => navigation.navigate('Forgot Password Screen')}
              style={styles.icon}
            >
              Forgot Password
            </FontAwesome5.Button>
          </TouchableOpacity>
        </View>
        <Text style={{ color: 'pink' }}>Need to signup?</Text>
        <View style={styles.sectionStyle}>
          <TouchableOpacity>
            <Ionicons.Button
              color={'rebeccapurple'}
              name="create"
              onPress={() => navigation.navigate('Registration Screen')}
              style={styles.icon}
            >
              Registration
            </Ionicons.Button>
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

export default LoginScreen;
