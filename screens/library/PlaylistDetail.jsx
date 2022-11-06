import React, { useContext, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AudioMenuItem from '../../components/music/audioMenu/AudioMenuItem';
import OptionModal from '../../components/music/audioMenu/OptionModal';

import { AudioContext } from '../../context/AudioProvider';

import AsyncStorage from '@react-native-async-storage/async-storage';

import color from '../../misc/color';
import { selectAudio } from '../../misc/audioController';

const PlaylistDetail = (props) => {
  const context = useContext(AudioContext);

  const playlist = props.route?.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [audios, setAudios] = useState(playlist.audios);

  const playAudio = async (audio) => {
    await selectAudio(audio, context, {
      activePlaylist: playlist,
      isPlaylistRunning: true,
    });
  };

  const closeModal = () => {
    setSelectedItem({});
    setModalVisible(false);
  };

  const removeAudio = async () => {
    let activePlaylist = context.activePlaylist;
    let isPlaying = context.isPlaying;
    let isPlaylistRunning = context.isPlaylistRunning;
    let playbackPosition = context.playbackPosition;
    let soundObject = context.soundObject;

    if (
      context.isPlaylistRunning &&
      context.currentAudio.id === selectedItem.id
    ) {
      //stop audio
      await context.playbackObj.stopAsync();
      await context.playbackObj.unloadAsync();

      activePlaylist = [];
      isPlaying = false;
      isPlaylistRunning = false;
      playbackPosition = 0;
      soundObject = null;
    }

    const newAudios = audios.filter((audio) => audio.id !== selectedItem.id);

    const result = await AsyncStorage.getItem('playlist');

    if (result !== null) {
      const oldPlaylists = JSON.parse(result);
      const updatedPlaylists = oldPlaylists.filter((item) => {
        if (item.id === playlist.id) {
          item.audios = newAudios;
        }

        return item;
      });

      AsyncStorage.setItem('playlist', JSON.stringify(updatedPlaylists));

      context.updateState(context, {
        activePlaylist,
        isPlaying,
        isPlaylistRunning,
        playlist: updatedPlaylists,
        playbackPosition,
        soundObject,
      });
    }

    setAudios(newAudios);

    closeModal();
  };

  const removePlaylist = async () => {
    let activePlaylist = context.activePlaylist;
    let isPlaying = context.isPlaying;
    let isPlaylistRunning = context.isPlaylistRunning;
    let playbackPosition = context.playbackPosition;
    let soundObject = context.soundObject;

    if (context.isPlaylistRunning && activePlaylist.id === playlist.id) {
      //stop audio
      await context.playbackObj.stopAsync();
      await context.playbackObj.unloadAsync();

      activePlaylist = [];
      isPlaying = false;
      isPlaylistRunning = false;
      playbackPosition = 0;
      soundObject = null;
    }

    const result = await AsyncStorage.getItem('playlist');

    if (result !== null) {
      const oldPlaylists = JSON.parse(result);
      const updatedPlaylists = oldPlaylists.filter(
        (item) => item.id !== playlist.id
      );

      AsyncStorage.setItem('playlist', JSON.stringify(updatedPlaylists));

      context.updateState(context, {
        activePlaylist,
        isPlaying,
        isPlaylistRunning,
        playlist: updatedPlaylists,
        playbackPosition,
        soundObject,
      });
    }

    props.navigation.goBack();
  };

  return (
    // <Modal
    //   animationType="slide"
    //   onRequestClose={onClose}
    //   transparent
    //   visible={visible}
    // >
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            width: '100%',
          }}
        >
          <Text style={styles.title}>{playlist.title}</Text>
          <TouchableOpacity onPress={removePlaylist}>
            <Text style={[styles.title, { color: 'red' }]}>Remove</Text>
          </TouchableOpacity>
        </View>
        {audios.length ? (
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={audios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10 }}>
                <AudioMenuItem
                  activeListItem={item.id === context.currentAudio.id}
                  duration={item.duration}
                  isPlaying={context.isPlaying}
                  onAudioPress={() => playAudio(item)}
                  onOptionPress={() => {
                    setSelectedItem(item);
                    setModalVisible(true);
                  }}
                  title={item.filename}
                />
              </View>
            )}
          />
        ) : (
          <Text
            style={{
              color: color.FONT_LIGHT,
              fontSize: 25,
              fontWeight: 'bold',
              paddingTop: 50,
            }}
          >
            No Songs in Playlist
          </Text>
        )}
      </View>
      <OptionModal
        currentItem={selectedItem}
        onClose={closeModal}
        options={[{ onPress: removeAudio, title: 'Remove from playlist' }]}
        visible={modalVisible}
      />
    </>
    //   <View style={[StyleSheet.absoluteFillObject, styles.modalBG]} />
    // </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  listContainer: {
    padding: 20,
  },
  title: {
    color: color.ACTIVE_BG,
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 5,
    textAlign: 'center',
  },
});

export default PlaylistDetail;
