import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import PlaylistInputModal from '../../components/music/playlistModal/PlaylistInputModal';
// import PlaylistDetail from '../../components/playlistDetail/PlaylistDetail';
import PlaylistDetail from './PlaylistDetail';

import color from '../../misc/color';

import { AudioContext } from '../../context/AudioProvider';

const backgroundImage = require('../../assets/Home.png');

let selectedPlaylist = {};

const LibraryScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const context = useContext(AudioContext);

  const { addToPlaylist, playlist, updateState } = context;

  const createPlaylist = async (playlistName) => {
    const result = AsyncStorage.getItem('playlist');

    if (result !== null) {
      const audios = [];

      if (addToPlaylist) {
        audios.push(addToPlaylist);
      }

      const newList = {
        audios,
        id: Date.now(),
        title: playlistName,
      };

      const updatedList = [...playlist, newList];

      updateState(context, {
        addToPlaylist: null,
        playlist: updatedList,
      });

      await AsyncStorage.setItem('playlist', JSON.stringify(updatedList));
    }

    setModalVisible(false);
  };

  const renderPlaylist = async () => {
    const result = await AsyncStorage.getItem('playlist');

    if (result === null) {
      const defaultPlaylist = {
        audios: [],
        id: Date.now(),
        title: 'My Favorite',
      };

      const newPlaylist = [...playlist, defaultPlaylist];
      updateState(context, { playlist: [...newPlaylist] });

      return await AsyncStorage.setItem(
        'playlist',
        JSON.stringify([...newPlaylist])
      );
    }

    updateState(context, { playlist: JSON.parse(result) });
  };

  useEffect(() => {
    if (!playlist.length) {
      renderPlaylist();
    }
  }, []);

  const handleBannerPress = async (playlist) => {
    // update playlist if there is any selected audio
    if (addToPlaylist) {
      const result = await AsyncStorage.getItem('playlist');

      let oldList = [];
      let updatedList = [];
      let sameAudio = false;

      if (result !== null) {
        oldList = JSON.parse(result);

        updatedList = oldList.filter((list) => {
          if (list.id === playlist.id) {
            // we want to check if that same audio is already inside our list or not

            for (let audio of list.audios) {
              if (audio.id === addToPlaylist.id) {
                //alert with a message
                sameAudio = true;
                return;
              }
            }

            // else update the playlist
            list.audios = [...list.audios, addToPlaylist];
          }

          return list;
        });
      }

      if (sameAudio) {
        Alert.alert(
          'Found duplicate audio',
          `$${addToPlaylist.filename} is already inside the list.`
        );

        sameAudio = false;

        return updateState(context, { addToPlaylist: null });
      }

      updateState(context, { addToPlaylist: null, playlist: [...updatedList] });

      return AsyncStorage.setItem('playlist', JSON.stringify([...updatedList]));
    }

    // if there is no audio selected then we want to open the list
    selectedPlaylist = playlist;

    // setShowPlaylist(true);

    navigation.navigate('Playlist Detail', playlist);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor={color.ACTIVE_BG} hidden={false} />
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.container}>
          {playlist.length
            ? playlist.map((item) => (
                <TouchableOpacity
                  key={item.id.toString()}
                  onPress={() => handleBannerPress(item)}
                  style={styles.playlistBanner}
                >
                  <Text
                    style={{
                      textShadowColor: color.ACTIVE_BG,
                      textShadowOffset: { width: 0.5, height: 0.5 },
                      textShadowRadius: 1,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.audioCount}>
                    {item.audios.length > 1 || !item.audios.length
                      ? `${item.audios.length} Songs`
                      : `${item.audios.length} Song`}
                  </Text>
                </TouchableOpacity>
              ))
            : null}

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ marginTop: 15 }}
          >
            <Text style={[styles.playlistButton]}>+ Add New Playlist</Text>
          </TouchableOpacity>

          <PlaylistInputModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={createPlaylist}
          />

          {/* <PlaylistDetail
        onClose={() => setShowPlaylist(false)}
        playlist={selectedPlaylist}
        visible={showPlaylist}
      /> */}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  audioCount: {
    fontSize: 14,
    marginTop: 3,
    opacity: 0.87,
    textShadowColor: color.ACTIVE_BG,
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
  },
  container: {
    padding: 20,
  },
  playlistBanner: {
    backgroundColor: 'rgba(204, 204, 204, 0.87)',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 10,
  },
  playlistButton: {
    color: color.FONT_LIGHT,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    padding: 5,
    textShadowColor: color.ACTIVE_BG,
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  safeAreaView: {
    backgroundColor: color.FONT_LIGHT,
    flex: 1,
  },
});

export default LibraryScreen;
