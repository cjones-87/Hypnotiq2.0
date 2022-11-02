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
import PlaylistDetail from '../../components/music/playlistDetail/PlaylistDetail';

import color from '../../misc/color';

import { AudioContext } from '../../context/AudioProvider';

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
          'Found same audio',
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
    setShowPlaylist(true);
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {playlist.length
          ? playlist.map((item) => (
              <TouchableOpacity
                key={item.id.toString()}
                onPress={() => handleBannerPress(item)}
                style={styles.playlistBanner}
              >
                <Text>{item.title}</Text>
                <Text style={styles.audioCount}>
                  {item.audios.length > 1
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
          <Text style={styles.playlistButton}>+ Add New Playlist</Text>
        </TouchableOpacity>

        <PlaylistInputModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={createPlaylist}
        />

        <PlaylistDetail
          onClose={() => setShowPlaylist(false)}
          playlist={selectedPlaylist}
          visible={showPlaylist}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  audioCount: {
    fontSize: 14,
    opacity: 0.5,
    marginTop: 3,
  },
  container: {
    padding: 20,
  },
  playlistBanner: {
    backgroundColor: 'rgba(204, 204, 204, 0.3)',
    borderRadius: 5,
    marginBottom: 15,
    padding: 5,
  },
  playlistButton: {
    color: color.ACTIVE_BG,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
    padding: 5,
  },
});

export default LibraryScreen;
