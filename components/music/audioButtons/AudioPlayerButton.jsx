import React from 'react';

import { AntDesign, Ionicons } from '@expo/vector-icons';
import color from '../../../misc/color';

const AudioPlayerButton = (props) => {
  const { iconColor = color.FONT, iconType, onPress, size = 40 } = props;

  const getIconName = (type) => {
    switch (type) {
      case 'PLAY':
        return 'pause-circle';
      case 'PAUSE':
        return 'play-circle';
      case 'NEXT':
        return 'md-play-forward-circle';
      case 'PREV':
        return 'ios-play-back-circle';
      //   case 'PLAY':
      //     return 'pausecircle';
      //   case 'PAUSE':
      //     return 'play';
      //   case 'NEXT':
      //     return 'forward';
      //   case 'PREV':
      //     return 'banckward';
    }
  };

  return (
    <Ionicons
      {...props}
      color={iconColor}
      name={getIconName(iconType)}
      onPress={onPress}
      size={size}
      //   {...otherProps}
      //   style={{ marginHorizontal: 15 }}
    />
    // <AntDesign
    //   color={iconColor}
    //   name={getIconName(iconType)}
    //   onPress={onPress}
    //   size={size}
    //   {...otherProps}
    // />
  );
};

export default AudioPlayerButton;
