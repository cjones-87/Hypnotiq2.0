import React, { useEffect, useState } from 'react';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from '../screens/splash/Splash.jsx';
import LoginScreen from '../screens/authentication/login/LoginScreen.jsx';
import ForgotPasswordScreen from '../screens/authentication/forgottenPassword/ForgotPasswordScreen.jsx';
import RegistrationScreen from '../screens/authentication/registration/RegistrationScreen.jsx';

import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/search/SearchScreen';
import LibraryScreen from '../screens/library/LibraryScreen';
// import AudioPlaylist from '../screens/music/audioPlaylist/AudioPlaylist';
import AudioPlayer from '../screens/music/audioPlayer/AudioPlayer';
import AudioMenu from '../screens/music/audioMenu/AudioMenu';
import PlaylistDetail from '../screens/library/PlaylistDetail.jsx';

import { firebase } from '../firebase';

import AudioProvider from '../context/AudioProvider.jsx';

import color from '../misc/color.js';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PlaylistScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Library Screen"
      screenOptions={{ headerTitleAlign: 'center', headerShown: false }}
    >
      <Stack.Screen
        component={LibraryScreen}
        name="Library Screen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={PlaylistDetail}
        name="Playlist Detail"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const BottomNavigationBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerTitleAlign: 'center', headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="home" color={color.ACTIVE_BG} size={25} />
          ),
          tabBarActiveBackgroundColor: 'black',
          tabBarActiveTintColor: color.FONT,
          tabBarInactiveBackgroundColor: color.FONT,
          tabBarInactiveTintColor: color.ACTIVE_BG,
        }}
      />
      <Tab.Screen
        name="Browse"
        component={SearchScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="search" color={color.ACTIVE_BG} size={25} />
          ),
          tabBarActiveBackgroundColor: 'black',
          tabBarActiveTintColor: color.FONT,
          tabBarInactiveBackgroundColor: color.FONT,
          tabBarInactiveTintColor: color.ACTIVE_BG,
        }}
      />
      {/* <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons
              name="library-music"
              color={color.ACTIVE_BG}
              size={25}
            />
          ),
          tabBarActiveBackgroundColor: 'black',
          tabBarActiveTintColor: color.FONT,
          tabBarInactiveBackgroundColor: color.FONT,
          tabBarInactiveTintColor: color.ACTIVE_BG,
        }}
      /> */}
      <Tab.Screen
        name="Hypnotiq Player"
        component={AudioPlayer}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="headset" color={color.ACTIVE_BG} size={25} />
          ),
          tabBarActiveBackgroundColor: 'black',
          tabBarActiveTintColor: color.FONT,
          tabBarInactiveBackgroundColor: color.FONT,
          tabBarInactiveTintColor: color.ACTIVE_BG,
        }}
      />

      <Tab.Screen
        name="Playlists"
        component={PlaylistScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons
              name="library-music"
              color={color.ACTIVE_BG}
              size={25}
            />
          ),
          tabBarActiveBackgroundColor: 'black',
          tabBarActiveTintColor: color.FONT,
          tabBarInactiveBackgroundColor: color.FONT,
          tabBarInactiveTintColor: color.ACTIVE_BG,
        }}
      />

      <Tab.Screen
        name="Library"
        component={AudioMenu}
        options={{
          tabBarIcon: () => (
            <Entypo name="folder-music" color={color.ACTIVE_BG} size={25} />
          ),
          tabBarActiveBackgroundColor: 'black',
          tabBarActiveTintColor: color.FONT,
          tabBarInactiveBackgroundColor: color.FONT,
          tabBarInactiveTintColor: color.ACTIVE_BG,
        }}
      />
    </Tab.Navigator>
  );
};

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
    const subscriber = firebase.auth()?.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator
        initialRouteName="Splash Screen"
        screenOptions={{ headerTitleAlign: 'center', headerShown: false }}
      >
        <Stack.Screen
          component={Splash}
          name="Splash Screen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={LoginScreen}
          name="Login Screen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ForgotPasswordScreen}
          name="Forgot Password Screen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={RegistrationScreen}
          name="Registration Screen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={BottomNavigationBar}
          name="Bottom Navigation Bar"
          options={{ headerShown: false }}
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
      {/* <Stack.Screen
        component={PlaylistDetail}
        name="Playlist Detail"
        options={{ headerShown: false }}
      /> */}
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
