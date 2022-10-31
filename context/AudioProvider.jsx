import React, { createContext } from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as MediaLibrary from 'expo-media-library';

import { DataProvider } from 'recyclerlistview';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Audio } from 'expo-av';

export const AudioContext = createContext();

export default class AudioProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFiles: [],
      currentAudio: {},
      currentAudioIndex: null,
      dataProvider: new DataProvider((rule1, rule2) => rule1 !== rule2),
      isPlaying: false,
      permissionError: false,
      playbackObj: null,
      soundObject: null,
      playbackDuration: null,
      playbackPosition: null,
    };
    this.totalAudioCount = 0;
  }

  permissionAlert = () => {
    Alert.alert('Permission Required', 'This app needs to read audio files!', [
      { onPress: () => this.getPermission(), text: 'I am ready' },
      { onPress: () => this.permissionAlert(), text: 'Cancel' },
    ]);
  };

  loadPreviousAudio = async () => {
    let previousAudio = await AsyncStorage.getItem('previousAudio');
    let currentAudio;
    let currentAudioIndex;

    if (previousAudio === null) {
      currentAudio = this.state.audioFiles[0];
      currentAudioIndex = 0;
    } else {
      previousAudio = JSON.parse(previousAudio);
      currentAudio = previousAudio.audio;
      currentAudioIndex = previousAudio.index;
    }

    this.setState({ ...this.state, currentAudio, currentAudioIndex });
  };

  getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      // we want all audio files
      this.getAudioFiles();
    }

    if (!permission.granted && !permission.canAskAgain) {
      this.setState({ ...this.state, permissionError: true });
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === 'denied' && canAskAgain) {
        this.permissionAlert(
          'user must allow this permission in order to work this app'
        );
      }
      if (status === 'granted') {
        // we want all audio files
        this.getAudioFiles;
      }

      if (status === 'denied' && !canAskAgain) {
        // we want to display an error to the user
        this.setState({ ...this.state, permissionError: true });
      }
    }
  };

  getAudioFiles = async () => {
    const { dataProvider, audioFiles } = this.state;

    let media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    });

    this.totalAudioCount = media.totalCount;

    this.setState({
      ...this.state,
      audioFiles: [...audioFiles, ...media.assets],
      dataProvider: dataProvider.cloneWithRows([
        ...audioFiles,
        ...media.assets,
      ]),
    });
  };

  componentDidMount() {
    this.getPermission();

    if (this.state.playbackObj === null) {
      this.setState({ ...this.state, playbackObj: new Audio.Sound() });
    }
  }

  updateState = (previousState, newState = {}) => {
    this.setState({ ...previousState, ...newState });
  };

  render() {
    const {
      audioFiles,
      currentAudio,
      currentAudioIndex,
      dataProvider,
      isPlaying,
      permissionError,
      playbackDuration,
      playbackObj,
      playbackPosition,
      soundObject,
    } = this.state;

    if (permissionError)
      return (
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            <Text style={styles.text}>
              You need to accept permission first!
            </Text>
          </View>
        </SafeAreaView>
      );

    return (
      <AudioContext.Provider
        value={{
          audioFiles,
          currentAudio,
          currentAudioIndex,
          dataProvider,
          isPlaying,
          loadPreviousAudio: this.loadPreviousAudio,
          playbackDuration,
          playbackObj,
          playbackPosition,
          soundObject,
          totalAudioCount: this.totalAudioCount,
          updateState: this.updateState,
        }}
      >
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 19,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  safeAreaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight / 10000,
  },
  text: {
    color: 'rebeccapurple',
    fontSize: 32,
    textAlign: 'center',
  },
});
