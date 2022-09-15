import React, { useCallback, useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

/* Keeps the splash screen visible while resources are fetched*/
SplashScreen.preventAutoHideAsync();

export default function Splash({ navigation }) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        /* Pre-load fonts here. Any necessary api calls will be made here */
        await Font.loadAsync(FontAwesome.font);
        await Font.loadAsync(Entypo.font);

        /* To simulate slow loading  experience, force delay for two seconds */
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        /* Tell application to render */
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      /* This tells the splash screen to hide immediately. If this is called after
      `setAppIsReady`, then we may see a blank screen while the app is
      loading its initial state and rendering its first pixels. So instead,
      we hide the splash screen once we know the root view has already
      performed layout.*/
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.safeAreaView} onLayout={onLayoutRootView}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'rebeccapurple'} hidden={false} />
        <TouchableOpacity>
          <Text
            style={styles.text}
            onPress={() => navigation.navigate('Bottom Navigation Bar')}
          >
            <Entypo name="music" size={styles.text.fontSize} /> Hypnotic 2.0
            <Entypo name="music" size={styles.text.fontSize} />
          </Text>
        </TouchableOpacity>
        <FontAwesome
          name="play-circle"
          size={styles.text.fontSize * 2}
          color={styles.text.color}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeAreaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight / 10000,
  },
  text: {
    color: 'rebeccapurple',
    fontSize: 30,
  },
});
