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

import {
  pause,
  play,
  playNext,
  resume,
  selectAudio,
} from '../../../misc/audioController';

import { storeAudioForNextOpening } from '../../../misc/helper';
import color from '../../../misc/color';

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

  handleAudioPress = async (audio) => {
    await selectAudio(audio, this.context);
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

  navigateToPlaylist = () => {
    this.context.updateState(this.context, {
      addToPlaylist: this.currentItem,
    });
    this.props.navigation.navigate('Playlist');
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
                style={{
                  color: this.context.isPlaying
                    ? color.ACTIVE_BG
                    : color.FONT_MEDIUM,
                }}
              />
              <OptionModal
                currentItem={this.currentItem}
                // onAddToPlaylist={() => {
                //   this.context.updateState(this.context, {
                //     addToPlaylist: this.currentItem,
                //   });
                //   this.props.navigation.navigate('Library');
                // }}
                onClose={() =>
                  this.setState({ ...this.state, optionModalVisible: false })
                }
                onLike={() => console.log('added to liked')}
                // onPlayPress={() => console.log('playing audio')}
                options={[
                  {
                    onPress: this.navigateToPlaylist,
                    title: 'Add to playlist',
                  },
                ]}
                style={{
                  color: this.context.isPlaying
                    ? color.ACTIVE_BG
                    : color.FONT_MEDIUM,
                }}
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
    color: color.ACTIVE_BG,
    fontSize: 32,
    textAlign: 'center',
  },
});
