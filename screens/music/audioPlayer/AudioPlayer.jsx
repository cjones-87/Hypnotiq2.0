import React, { createContext, useContext, useEffect, useState } from 'react';
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

import {
  changeAudio,
  moveAudio,
  pause,
  resume,
  selectAudio,
} from '../../../misc/audioController';

import { convertTime, storeAudioForNextOpening } from '../../../misc/helper';

const { width } = Dimensions.get('window');

const AudioPlayer = () => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const context = useContext(AudioContext);

  const { currentAudio, playbackDuration, playbackPosition, totalAudioCount } =
    context;

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
    await selectAudio(context.currentAudio, context);
  };

  const handleNext = async () => {
    await changeAudio(context, 'next');
  };

  const handlePrevious = async () => {
    await changeAudio(context, 'previous');
  };

  const renderCurrentTime = () => {
    return convertTime(context.playbackPosition / 1000);
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

        <View style={styles.playbackPosition}>
          <Text>{currentPosition ? currentPosition : renderCurrentTime()}</Text>

          <Text>{convertTime(context.currentAudio.duration)}</Text>
        </View>

        <Slider
          style={{ width: width, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={color.FONT_MEDIUM}
          maximumTrackTintColor={color.ACTIVE_BG}
          onSlidingComplete={async (value) => await moveAudio(context, value)}
          onSlidingStart={async () => {
            //if you pause with nothing to pause will throw an error
            if (!context.isPlaying) return;

            try {
              await pause(context.playbackObj);
            } catch (error) {
              console.log('error inside onslidingstart callback', error);
            }
          }}
          onValueChange={(value) => {
            setCurrentPosition(
              convertTime(value * context.currentAudio.duration)
            );
          }}
          value={calculateSeekBar()}
        />
        <View style={styles.audioControllers}>
          <TouchableOpacity onPress={handlePrevious}>
            <AudioPlayerButton iconType="PREV" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause}>
            <AudioPlayerButton
              iconType={context.isPlaying ? 'PLAY' : 'PAUSE'}
              style={{ marginHorizontal: 25 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext}>
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
  playbackPosition: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});

export default AudioPlayer;
