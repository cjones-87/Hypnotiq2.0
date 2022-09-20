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

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'rebeccapurple'} hidden={false} />
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Forgot Password?</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          onChangeText={(email) => setEmail(email)}
          placeholder={'Enter account email'}
          placeholderTextColor={'rebeccapurple'}
          style={styles.input}
          value={email}
        />
        <Entypo name="email" style={styles.icon} />
      </View>
      <View>
        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons.Button
            color={'rebeccapurple'}
            name="shield-refresh"
            style={styles.iconButton}
          >
            Forgot Password
          </MaterialCommunityIcons.Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginTop: 65,
    width: Dimensions.get('window').width - 192,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    position: 'relative',
  },
  headerText: {
    alignSelf: 'center',
    color: 'rebeccapurple',
    marginBottom: 40,
    fontSize: 32,
  },
  headerView: {
    marginTop: 150,
  },
  icon: {
    alignSelf: 'center',
    backgroundColor: 'pink',
    color: 'rebeccapurple',
    height: 44,
    justifyContent: 'center',
    padding: 10,
    textAlignVertical: 'center',
  },
  iconButton: {
    backgroundColor: 'pink',
  },
  input: {
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

export default ForgotPasswordScreen;
