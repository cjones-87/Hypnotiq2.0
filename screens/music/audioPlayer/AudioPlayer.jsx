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

    if (currentAudio.lastPosition) {
      return currentAudio.lastPosition / (currentAudio.duration * 1000);
    }

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
    if (!context.soundObject && currentAudio.lastPosition) {
      return convertTime(currentAudio.lastPosition / 1000);
    }

    return convertTime(context.playbackPosition / 1000);
  };

  if (!context.currentAudio) return null;

  return (
    // <Screen style={styles.container}>
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: context.isPlaying ? 'black' : color.ACTIVE_BG },
      ]}
    >
      <View
        style={[
          styles.audioCountContainer,
          {
            color: context.isPlaying ? color.ACTIVE_BG : 'pink',
          },
        ]}
      >
        <View style={{ flexDirection: 'row' }}>
          {context.isPlaylistRunning && (
            <>
              <Text
                style={{
                  color: context.isPlaying ? color.ACTIVE_BG : 'pink',
                  fontWeight: 'bold',
                }}
              >
                From Playlist:
              </Text>
              <Text
                style={{
                  color: context.isPlaying ? color.ACTIVE_BG : 'pink',
                }}
              >
                {context.activePlaylist.title}
              </Text>
            </>
          )}
        </View>

        <Text
          style={[
            styles.audioCount,
            { color: context.isPlaying ? color.ACTIVE_BG : 'pink' },
          ]}
        >{`${context.currentAudioIndex + 1} / ${totalAudioCount}`}</Text>
      </View>

      <View
        style={[
          styles.midBannerContainer,
          ,
          { color: context.isPlaying ? color.ACTIVE_BG : 'pink' },
        ]}
      >
        <Ionicons
          name="musical-notes"
          size={225}
          color={context.isPlaying ? color.ACTIVE_BG : 'pink'}
        />
      </View>

      <View style={styles.audioPlayerContainer}>
        <Text
          numberOfLines={1}
          style={[
            styles.audioTitle,
            { color: context.isPlaying ? color.ACTIVE_BG : 'pink' },
          ]}
        >
          {context.currentAudio.filename}
        </Text>

        <View
          style={[
            styles.playbackPosition,
            ,
            { color: context.isPlaying ? color.ACTIVE_BG : 'pink' },
          ]}
        >
          <Text
            style={{
              color: context.isPlaying ? color.ACTIVE_BG : 'pink',
            }}
          >
            {currentPosition ? currentPosition : renderCurrentTime()}
          </Text>

          <Text
            style={{
              color: context.isPlaying ? color.ACTIVE_BG : 'pink',
            }}
          >
            {convertTime(context.currentAudio.duration)}
          </Text>
        </View>

        <Slider
          style={{
            color: context.isPlaying ? color.ACTIVE_BG : 'pink',
            width: width,
            height: 40,
          }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={color.FONT_MEDIUM}
          maximumTrackTintColor={color.ACTIVE_BG}
          onSlidingComplete={async (value) => {
            await moveAudio(context, value);

            setCurrentPosition(0);
          }}
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
            <AudioPlayerButton
              iconType="PREV"
              style={{
                color: context.isPlaying ? color.ACTIVE_BG : color.FONT_MEDIUM,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause}>
            <AudioPlayerButton
              iconType={context.isPlaying ? 'PLAY' : 'PAUSE'}
              style={{
                color: context.isPlaying ? color.ACTIVE_BG : color.FONT_MEDIUM,
                marginHorizontal: 25,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext}>
            <AudioPlayerButton
              iconType="NEXT"
              style={{
                color: context.isPlaying ? color.ACTIVE_BG : color.FONT_MEDIUM,
              }}
            />
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
    color: color.FONT_LIGHT,
    fontSize: 14,
    textAlign: 'right',
  },
  audioCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  audioTitle: {
    color: color.FONT,
    fontSize: 16,
    padding: 15,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
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
