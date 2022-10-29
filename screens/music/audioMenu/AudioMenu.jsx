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

  handleAudioPress = async (audio) => {
    const { currentAudio, soundObject, playbackObj, updateState } =
      this.context;

    console.log('sound object =====>', soundObject);
    // when playing audio for the first time
    if (soundObject === null) {
      const playbackObj = new Audio.Sound();
      const status = await play(playbackObj, audio.uri);

      return updateState(this.context, {
        currentAudio: audio,
        playbackObj,
        soundObject: status,
      });
    }

    // when wanting to pause audio
    if (
      soundObject.isLoaded &&
      soundObject.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await pause(playbackObj);

      return updateState(this.context, {
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

      return updateState(this.context, { soundObject: status });
    }

    // when wanting to select another audio
    if (soundObject.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playbackObj, audio.uri);

      return updateState(this.context, {
        currentAudio: audio,
        soundObject: status,
      });
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
