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

export default class AudioMenu extends React.Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);

    this.state = {
      currentAudio: {},
      optionModalVisible: false,
      playbackObj: null,
      soundObject: null,
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

  handleAudioPress = async (audio) => {
    // when playing audio for the first time
    if (this.state.soundObject === null) {
      const playbackObj = new Audio.Sound();
      const status = await playbackObj.loadAsync(
        { uri: audio.uri },
        { shouldPlay: true }
      );

      return this.setState({
        ...this.state,
        currentAudio: audio,
        playbackObj,
        soundObject: status,
      });
    }

    // when wanting to pause audio
    if (this.state.soundObject.isLoaded && this.state.soundObject.isPlaying) {
      const status = await this.state.playbackObj.setStatusAsync({
        shouldPlay: false,
      });
      return this.setState({ ...this.state, soundObject: status });
    }

    // when wanting to resume same audio
    if (
      this.state.soundObject.isLoaded &&
      !this.state.soundObject.isPlaying &&
      this.state.currentAudio.id === audio.id
    ) {
      const status = await this.state.playbackObj.playAsync();
      return this.setState({ ...this.state, soundObject: status });
    }
  };

  rowRenderer = (type, item) => {
    return (
      <AudioMenuItem
        duration={item.duration}
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
        {({ dataProvider }) => {
          return (
            <SafeAreaView style={styles.safeAreaView}>
              <RecyclerListView
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
              />
              <OptionModal
                currentItem={this.currentItem}
                onAddToPlaylist={() => console.log('adding to the playlist')}
                onClose={() =>
                  this.setState({ ...this.state, optionModalVisible: false })
                }
                onLike={() => console.log('added to liked')}
                onPlayPress={() => console.log('playing audio')}
                visible={this.state.optionModalVisible}
              />
            </SafeAreaView>
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
