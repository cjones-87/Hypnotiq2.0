import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/search/SearchScreen';
import LibraryScreen from '../screens/library/LibraryScreen';

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
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="search" color="rebeccapurple" size={25} />
          ),
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
        }}
      />
    </Tab.Navigator>
  );
}
