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

import color from '../../misc/color';

import { AudioContext } from '../../context/AudioProvider';

const backgroundImage = require('../../assets/favicon.png');

const LibraryScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {playlist.length
          ? playlist.map((item) => (
              <TouchableOpacity
                key={item.id.toString()}
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
