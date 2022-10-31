import React, { createContext, useContext, useEffect } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Screen from '../../../components/music/Screen';

import { Ionicons } from '@expo/vector-icons';

import color from '../../../misc/color';

import Slider from '@react-native-community/slider';

import AudioPlayerButton from '../../../components/music/audioButtons/AudioPlayerButton';

import { AudioContext } from '../../../context/AudioProvider';

import { pause, play, resume } from '../../../misc/audioController';

const { width } = Dimensions.get('window');

const AudioPlayer = () => {
  // const context = createContext(AudioContext);
  const context = useContext(AudioContext);

  const { currentAudio, playbackDuration, playbackPosition, totalAudioCount } =
    context;
  // useContext(context);
  //playbackDuration and playbackPosition displaying as null

  const calculateSeekBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }

    // if (currentAudio.lastPosition) {
    //   return currentAudio.lastPosition / (currentAudio.duration * 1000);
    // }

    return 0;
  };

  useEffect(() => {
    context.loadPreviousAudio();
  }, []);

  const handlePlayPause = async () => {
    // play
    if (context.soundObject === null) {
      const audio = context.currentAudio;

      const status = await play(context.playbackObj, audio.uri);

      return context.updateState(context, {
        isPlaying: false,
        soundObject: status,
      });
    }

    //pause
    if (context.soundObject && context.soundObject.isPlaying) {
      const status = await pause(context.playbackObj);
      return context.updateState(context, {
        isPlaying: true,
        soundObject: status,
      });
    }

    //resume
    if (context.soundObject && !context.soundObject.isPlaying) {
      const status = await resume(context.playbackObj);
      return context.updateState(context, {
        isPlaying: true,
        soundObject: status,
      });
    }
  };

  if (!context.currentAudio) return null;

  return (
    // <Screen style={styles.container}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.audioCount}>{`${
        context.currentAudioIndex + 1
      } / ${totalAudioCount}`}</Text>
      <View style={styles.midBannerContainer}>
        <Ionicons
          name="musical-notes"
          size={225}
          color={context.isPlaying ? color.ACTIVE_BG : color.FONT_MEDIUM}
        />
      </View>
      <View style={styles.audioPlayerContainer}>
        <Text numberOfLines={1} style={styles.audioTitle}>
          {context.currentAudio.filename}
        </Text>

        <Slider
          style={{ width: width, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={color.FONT_MEDIUM}
          maximumTrackTintColor={color.ACTIVE_BG}
          value={calculateSeekBar()}
        />
        <View style={styles.audioControllers}>
          <TouchableOpacity onPress={() => console.log('playing previous')}>
            <AudioPlayerButton iconType="PREV" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause}>
            <AudioPlayerButton
              iconType={context.isPlaying ? 'PLAY' : 'PAUSE'}
              style={{ marginHorizontal: 25 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('playing next')}>
            <AudioPlayerButton iconType="NEXT" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    //{/* </Screen> */}
  );
};

const styles = StyleSheet.create({
  audioControllers: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
    width,
  },
  audioCount: {
    backgroundColor: 'red',
    color: color.FONT_LIGHT,
    fontSize: 14,
    padding: 15,
    textAlign: 'right',
  },
  audioPlayerContainer: {},
  audioTitle: { color: color.FONT, fontSize: 16, padding: 15 },
  container: {
    backgroundColor: color.APP_BG,
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // paddingTop: StatusBar.currentHeight / 10000,
  },
  midBannerContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default AudioPlayer;
