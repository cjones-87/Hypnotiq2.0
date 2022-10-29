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

const getThumbnailText = (filename) => filename[0];

const convertTime = (minutes) => {
  if (minutes) {
    const hours = minutes / 60;
    // console.log('this is hours =====>', hours);
    const minute = hours.toString().split('.')[0];
    console.log('this is minutes =====>', minutes);

    // const percent = parseInt(hours.toString().split('.')[1].slice(0, 2));
    const percent = Number(hours.toString().split('.')[1].slice(0, 2));
    console.log('this is percent =====>', percent);

    const sec = Math.ceil((60 * percent) / 100);
    console.log('this is sec =====>', sec);

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
    <AntDesign name="pausecircle" size={24} color={color.ACTIVE_FONT} />
  ) : (
    <AntDesign name="play" size={24} color={color.FONT_LIGHT} />
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
      <View style={styles.container}>
        <TouchableOpacity onPress={onAudioPress}>
          <View style={styles.leftContainer}>
            <View
              style={[
                styles.thumbnail,
                {
                  backgroundColor: activeListItem
                    ? color.ACTIVE_BG
                    : color.FONT_LIGHT,
                },
              ]}
            >
              <Text style={styles.thumbnailText}>
                {activeListItem
                  ? renderPlayPauseIcon(isPlaying)
                  : getThumbnailText(title)}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
              <Text style={styles.timeText}>{convertTime(duration)}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.rightContainer}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={20}
            color={color.FONT_MEDIUM}
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
  thumbnailText: { color: color.FONT, fontSize: 22, fontWeight: 'bold' },
  title: { color: color.FONT, fontSize: 16 },
  titleContainer: {
    paddingLeft: 10,
    width: width - 180,
  },
});

export default AudioMenuItem;
