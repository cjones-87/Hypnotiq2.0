import React, { useState } from 'react';

import {
  Dimensions,
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
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor={'rebeccapurple'} hidden={false} />
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Login</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.container}>
          <TextInput
            onChangeText={(usernameOrEmail) =>
              setUsernameOrEmail(usernameOrEmail)
            }
            placeholder={'Username or Email'}
            placeholderTextColor={'rebeccapurple'}
            style={styles.usernameOrEmailInput}
            value={usernameOrEmail}
          />
          <Entypo name="email" style={styles.usernameOrEmailIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.container2}>
          <TextInput
            onChangeText={(password) => setPassword(password)}
            placeholder={'Password'}
            placeholderTextColor={'rebeccapurple'}
            secureTextEntry
            style={styles.passwordInput}
            value={password}
          />
          <Entypo name="eye" style={styles.passwordIcon} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.loginButton}>
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
      <View>
        <TouchableOpacity style={styles.forgotPasswordButton}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    position: 'relative',
  },
  container2: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    position: 'relative',
  },
  forgotPasswordButton: {
    alignSelf: 'center',
    marginTop: 5,
    width: Dimensions.get('window').width - 192,
  },
  headerText: {
    alignSelf: 'center',
    color: 'rebeccapurple',
    marginBottom: -40,
    fontSize: 32,
  },
  headerView: {
    marginTop: 150,
  },
  icon: {
    backgroundColor: 'pink',
  },
  loginButton: {
    alignSelf: 'center',
    marginTop: 65,
    width: Dimensions.get('window').width - 192,
  },
  passwordIcon: {
    alignSelf: 'center',
    backgroundColor: 'pink',
    color: 'rebeccapurple',
    height: 44,
    justifyContent: 'center',
    padding: 10,
    textAlignVertical: 'center',
  },
  passwordInput: {
    alignSelf: 'center',
    backgroundColor: 'pink',
    color: 'rebeccapurple',
    height: 44,
    justifyContent: 'center',
    padding: 10,
    textAlignVertical: 'center',
    width: Dimensions.get('window').width - 128,
  },
  safeAreaView: {
    paddingTop: 22,
  },
  usernameOrEmailIcon: {
    alignSelf: 'center',
    backgroundColor: 'pink',
    color: 'rebeccapurple',
    height: 44,
    justifyContent: 'center',
    padding: 10,
    textAlignVertical: 'center',
  },
  usernameOrEmailInput: {
    alignSelf: 'center',
    backgroundColor: 'pink',
    color: 'rebeccapurple',
    height: 44,
    justifyContent: 'center',
    padding: 10,
    textAlignVertical: 'center',
    width: Dimensions.get('window').width - 128,
  },
});

export default LoginScreen;
