import React, { useState } from 'react';

import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'rebeccapurple'} hidden={false} />
        <Text style={styles.text}>Forgot Password</Text>
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
          <TouchableOpacity>
            <MaterialCommunityIcons.Button
              color={'rebeccapurple'}
              name="lock-question"
              style={styles.icon}
            >
              Forgot Password
            </MaterialCommunityIcons.Button>
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

export default ForgotPasswordScreen;
