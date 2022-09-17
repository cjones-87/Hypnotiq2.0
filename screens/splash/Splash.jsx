import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Video } from 'expo-av';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import BlinkingText from '../../utils/textAnimations/BlinkingText';
import Hypnotiq from '../../assets/Hypnotiq.mp4';

/* Keeps the splash screen visible while resources are fetched*/
SplashScreen.preventAutoHideAsync();

export default function Splash({ navigation }) {
  const backgroundVideo = React.useRef(null);

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

        <Text
          style={styles.text}
          onPress={() => navigation.navigate('Bottom Navigation Bar')}
        >
          <BlinkingText
            style={styles.text}
            textData={`Hypnotiq 2.0`}
            textData2={`Dream On!`}
          />
        </Text>

        <Video
          isLooping
          isMuted
          ref={backgroundVideo}
          resizeMode="stretch"
          shouldPlay
          source={Hypnotiq}
          style={styles.video}
          // volume={0.36}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'yellow',
    flex: 1,
    justifyContent: 'center',
  },
  safeAreaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight / 10000,
  },
  text: {
    alignSelf: 'center',
    color: 'yellow',
    fontSize: Dimensions.get('window').width / 6,
    marginTop: Dimensions.get('window').height / 2.6,
    position: 'absolute',
    textAlign: 'center',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
    zIndex: -5,
  },
});
