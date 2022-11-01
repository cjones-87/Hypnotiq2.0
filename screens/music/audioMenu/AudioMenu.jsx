import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { AudioContext } from '../../../context/AudioProvider';

import { LayoutProvider, RecyclerListView } from 'recyclerlistview';

import AudioMenuItem from '../../../components/music/audioMenu/AudioMenuItem';

import OptionModal from '../../../components/music/audioMenu/OptionModal';

import { Audio } from 'expo-av';

import { pause, play, playNext, resume } from '../../../misc/audioController';

import { storeAudioForNextOpening } from '../../../misc/helper';

// import Screen from '../../../components/music/Screen';

export default class AudioMenu extends React.Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);

    this.state = {
      optionModalVisible: false,
    };

    this.currentItem = {};
  }

  layoutProvider = new LayoutProvider(
    (i) => 'audio',
    (type, dim) => {
      switch (type) {
        case 'audio':
          dim.height = 70;
          dim.width = Dimensions.get('window').width;
          break;
        default:
          dim.height = 0;
          dim.width = 0;
      }
    }
  );

  // onPlaybackStatusUpdate = async (playbackStatus) => {
  //   if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
  //     this.context.updateState(this.context, {
  //       playbackDuration: playbackStatus.durationMillis,
  //       playbackPosition: playbackStatus.positionMillis,
  //     });
  //   }

  //   if (playbackStatus.didJustFinish) {
  //     const nextAudioIndex = this.context.currentAudioIndex + 1;

  //     //we're either on the last song or there is no next audio
  //     if (nextAudioIndex >= this.context.totalAudioCount) {
  //       this.context.playbackObj.unloadAsync();

  //       this.context.updateState(this.context, {
  //         currentAudio: this.context.audioFiles[0],
  //         currentAudioIndex: 0,
  //         isPlaying: false,
  //         playbackDuration: null,
  //         playbackPosition: null,
  //         soundObject: null,
  //       });

  //       return await storeAudioForNextOpening(this.context.audioFiles[0], 0);
  //     }
  //     // else we want to skip to the next song
  //     const audio = this.context.audioFiles[nextAudioIndex];

  //     const status = await playNext(this.context.playbackObj, audio.uri);

  //     this.context.updateState(this.context, {
  //       currentAudio: audio,
  //       currentAudioIndex: nextAudioIndex,
  //       isPlaying: true,
  //       soundObject: status,
  //     });
  //     await storeAudioForNextOpening(audio, nextAudioIndex);
  //   }
  // };

  handleAudioPress = async (audio) => {
    const { audioFiles, currentAudio, playbackObj, soundObject, updateState } =
      this.context;

    // when playing audio for the first time
    if (soundObject === null) {
      const playbackObj = new Audio.Sound();
      const status = await play(playbackObj, audio.uri);
      const index = audioFiles.indexOf(audio);

      updateState(this.context, {
        currentAudio: audio,
        currentAudioIndex: index,
        isPlaying: true,
        playbackObj,
        soundObject: status,
      });

      playbackObj.setOnPlaybackStatusUpdate(
        this.context.onPlaybackStatusUpdate
      );

      return storeAudioForNextOpening(audio, index);
    }

    // when wanting to pause audio
    if (
      soundObject.isLoaded &&
      soundObject.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await pause(playbackObj);

      return updateState(this.context, {
        isPlaying: false,
        soundObject: status,
      });
    }

    // when wanting to resume same audio
    if (
      soundObject.isLoaded &&
      !soundObject.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(playbackObj);

      return updateState(this.context, {
        isPlaying: true,
        soundObject: status,
      });
    }

    // when wanting to select another audio
    if (soundObject.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playbackObj, audio.uri);
      const index = audioFiles.indexOf(audio);

      updateState(this.context, {
        currentAudio: audio,
        currentAudioIndex: index,
        isPlaying: true,
        soundObject: status,
      });
      return storeAudioForNextOpening(audio, index);
    }
  };

  componentDidMount() {
    this.context.loadPreviousAudio();
  }

  rowRenderer = (type, item, index, extendedState) => {
    return (
      <AudioMenuItem
        activeListItem={this.context.currentAudioIndex === index}
        duration={item.duration}
        isPlaying={extendedState.isPlaying}
        onAudioPress={() => this.handleAudioPress(item)}
        onOptionPress={() => {
          this.currentItem = item;
          this.setState({ ...this.state, optionModalVisible: true });
        }}
        title={item.filename}
      />
    );
  };

  render() {
    return (
      <AudioContext.Consumer>
        {({ dataProvider, isPlaying }) => {
          if (!dataProvider._data.length) return null;

          return (
            // <Screen>
            <SafeAreaView style={styles.safeAreaView}>
              <RecyclerListView
                dataProvider={dataProvider}
                extendedState={{ isPlaying }}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
              />
              <OptionModal
                currentItem={this.currentItem}
                onAddToPlaylist={() => {
                  this.props.navigation.navigate('Library');
                }}
                onClose={() =>
                  this.setState({ ...this.state, optionModalVisible: false })
                }
                onLike={() => console.log('added to liked')}
                onPlayPress={() => console.log('playing audio')}
                visible={this.state.optionModalVisible}
              />
            </SafeAreaView>
            // </Screen>
          );
        }}
      </AudioContext.Consumer>
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
    flex: 1,
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
