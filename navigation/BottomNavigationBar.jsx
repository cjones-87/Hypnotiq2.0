import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/search/SearchScreen';
import LibraryScreen from '../screens/library/LibraryScreen';

import AudioPlaylist from '../screens/music/audioPlaylist/AudioPlaylist';
import AudioPlayer from '../screens/music/audioPlayer/AudioPlayer';
import AudioMenu from '../screens/music/audioMenu/AudioMenu';

const Tab = createBottomTabNavigator();

export default function BottomNavigationBar() {
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
            <FontAwesome5 name="home" color="rebeccapurple" size={25} />
          ),
          tabBarActiveBackgroundColor: 'black',
          tabBarActiveTintColor: 'pink',
          tabBarInactiveBackgroundColor: 'pink',
          tabBarInactiveTintColor: 'rebeccapurple',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="search" color="rebeccapurple" size={25} />
          ),
          tabBarActiveBackgroundColor: 'black',
          tabBarActiveTintColor: 'pink',
          tabBarInactiveBackgroundColor: 'pink',
          tabBarInactiveTintColor: 'rebeccapurple',
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons
              name="library-music"
              color="rebeccapurple"
              size={25}
            />
          ),
          tabBarActiveBackgroundColor: 'black',
          tabBarActiveTintColor: 'pink',
          tabBarInactiveBackgroundColor: 'pink',
          tabBarInactiveTintColor: 'rebeccapurple',
        }}
      />
      <Tab.Screen
        name="AudioPlaylist"
        component={AudioPlaylist}
        options={{
          tabBarIcon: () => (
            <Entypo name="note" color="rebeccapurple" size={25} />
          ),
          tabBarActiveBackgroundColor: 'black',
          tabBarActiveTintColor: 'pink',
          tabBarInactiveBackgroundColor: 'pink',
          tabBarInactiveTintColor: 'rebeccapurple',
        }}
      />
      <Tab.Screen
        name="AudioPlayer"
        component={AudioPlayer}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="headset" color="rebeccapurple" size={25} />
          ),
          tabBarActiveBackgroundColor: 'black',
          tabBarActiveTintColor: 'pink',
          tabBarInactiveBackgroundColor: 'pink',
          tabBarInactiveTintColor: 'rebeccapurple',
        }}
      />
      <Tab.Screen
        name="AudioMenu"
        component={AudioMenu}
        options={{
          tabBarIcon: () => (
            <Entypo name="folder-music" color="rebeccapurple" size={25} />
          ),
          tabBarActiveBackgroundColor: 'black',
          tabBarActiveTintColor: 'pink',
          tabBarInactiveBackgroundColor: 'pink',
          tabBarInactiveTintColor: 'rebeccapurple',
        }}
      />
    </Tab.Navigator>
  );
}
