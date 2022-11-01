import React, { useEffect, useState } from 'react';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash/Splash.jsx';
import LoginScreen from '../screens/authentication/login/LoginScreen.jsx';
import ForgotPasswordScreen from '../screens/authentication/forgottenPassword/ForgotPasswordScreen.jsx';
import RegistrationScreen from '../screens/authentication/registration/RegistrationScreen.jsx';
import BottomNavigationBar from './BottomNavigationBar.jsx';

import { firebase } from '../firebase';

import AudioProvider from '../context/AudioProvider.jsx';

import color from '../misc/color.js';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: color.APP_BG,
  },
};

const Routes = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator
        initialRouteName="Splash Screen"
        screenOptions={{ headerTitleAlign: 'center', headerShown: false }}
      >
        <Stack.Screen name="Splash Screen" component={Splash} />
        <Stack.Screen component={LoginScreen} name="Login Screen" />
        <Stack.Screen
          name="Forgot Password Screen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          component={RegistrationScreen}
          name="Registration Screen"
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator
      initialRouteName="Splash Screen"
      screenOptions={{ headerTitleAlign: 'center', headerShown: false }}
    >
      <Stack.Screen name="Splash Screen" component={Splash} />
      <Stack.Screen
        name="Bottom Navigation Bar"
        component={BottomNavigationBar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ScreenNavigation = () => {
  return (
    <AudioProvider>
      <NavigationContainer theme={MyTheme}>
        <Routes />
      </NavigationContainer>
    </AudioProvider>
  );
};

export default ScreenNavigation;
