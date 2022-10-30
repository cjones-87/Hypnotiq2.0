import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import color from '../../misc/color';

const Screen = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{children}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.APP_BG,
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    // paddingTop: StatusBar.currentHeight / 10000,
  },
});

export default Screen;
