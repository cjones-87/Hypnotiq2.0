import React from 'react';

import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import color from '../../../misc/color';

const getThumbnailText = (filename, isPlaying) => (
  <Text style={{ color: isPlaying ? color.FONT : color.ACTIVE_BG }}>
    {filename[0]}
  </Text>
);

const convertTime = (minutes) => {
  if (minutes) {
    const hours = minutes / 60;
    const minute = hours.toString().split('.')[0];

    // const percent = parseInt(hours.toString().split('.')[1].slice(0, 2));
    const percent = Number(hours.toString().split('.')[1].slice(0, 2));

    const sec = Math.ceil((60 * percent) / 100);

    if (Number(minute) < 10 && sec < 10) {
      return `${parseInt(minute, 10)}:0${sec}`;
    }
    if (Number(minute) < 10) {
      return `${parseInt(minute, 10)}:${sec}`;
    }
    if (sec < 10) {
      return `${parseInt(minute, 10)}:0${sec}`;
    }
    return `${parseInt(minute, 10)}:${sec}`;
  }
};

const renderPlayPauseIcon = (isPlaying) => {
  return isPlaying ? (
    <AntDesign
      name="pausecircle"
      size={24}
      color={isPlaying ? color.FONT : color.FONT_MEDIUM}
    />
  ) : (
    <AntDesign name="play" size={24} color={color.FONT_MEDIUM} />
  );
};

const AudioMenuItem = ({
  activeListItem,
  duration,
  isPlaying,
  onAudioPress,
  onOptionPress,
  title,
}) => {
  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: activeListItem
              ? color.FONT_LIGHT
              : color.ACTIVE_BG,
            borderRadius: 25,
            opacity: 0.87,
          },
        ]}
      >
        <TouchableOpacity onPress={onAudioPress}>
          <View style={styles.leftContainer}>
            <View
              style={[
                styles.thumbnail,
                {
                  backgroundColor: activeListItem
                    ? color.ACTIVE_BG
                    : color.FONT,
                },
              ]}
            >
              <Text
                style={[
                  styles.thumbnailText,
                  { color: isPlaying ? color.ACTIVE_BG : color.FONT },
                ]}
              >
                {activeListItem
                  ? renderPlayPauseIcon(isPlaying)
                  : getThumbnailText(title)}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text
                numberOfLines={1}
                style={[
                  styles.title,
                  {
                    color:
                      isPlaying && activeListItem
                        ? color.ACTIVE_BG
                        : color.FONT,
                  },
                ]}
              >
                {title}
              </Text>
              <Text
                style={[
                  styles.timeText,
                  {
                    color:
                      isPlaying && activeListItem
                        ? color.ACTIVE_BG
                        : color.FONT,
                  },
                ]}
              >
                {convertTime(duration)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.rightContainer}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={20}
            color={isPlaying && activeListItem ? color.ACTIVE_BG : color.FONT}
            onPress={onOptionPress}
            style={{ padding: 10 }}
          />
        </View>
      </View>
      <View style={styles.separator}></View>
    </>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',

    flexDirection: 'row',
    width: width - 80,
  },
  leftContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  rightContainer: {
    alignItems: 'center',
    flexBasis: 50,
    height: 50,
    justifyContent: 'center',
  },
  separator: {
    alignSelf: 'center',
    backgroundColor: '#333',
    height: 0.5,
    marginTop: 10,
    opacity: 0.3,
    width: width - 80,
  },
  text: { color: color.FONT_LIGHT, fontSize: 14 },
  thumbnail: {
    alignItems: 'center',
    backgroundColor: color.FONT_LIGHT,
    borderRadius: 25,
    flexBasis: 50,
    height: 50,
    justifyContent: 'center',
  },
  thumbnailText: { fontSize: 22, fontWeight: 'bold' },
  title: { fontSize: 16 },
  titleContainer: {
    paddingLeft: 10,
    width: width - 180,
  },
});

export default AudioMenuItem;
