import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash/Splash.jsx';
import BottomNavigationBar from './BottomNavigationBar.jsx';

const Stack = createNativeStackNavigator();

const ScreenNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash Screen"
        screenOptions={{ headerTitleAlign: 'center' }}
      >
        <Stack.Screen name="Splash Screen" component={Splash} />
        <Stack.Screen
          name="Bottom Navigation Bar"
          component={BottomNavigationBar}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigation;
