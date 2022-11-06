import React, { useContext } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AudioMenuItem from '../../components/music/audioMenu/AudioMenuItem';

import { AudioContext } from '../../context/AudioProvider';

import color from '../../misc/color';
import { selectAudio } from '../../misc/audioController';

const PlaylistDetail = (props) => {
  const context = useContext(AudioContext);

  const playlist = props.route?.params;

  const playAudio = async (audio) => {
    await selectAudio(audio, context, {
      activePlaylist: playlist,
      isPlaylistRunning: true,
    });
  };

  return (
    // <Modal
    //   animationType="slide"
    //   onRequestClose={onClose}
    //   transparent
    //   visible={visible}
    // >
    <View style={styles.container}>
      <Text style={styles.title}>{playlist.title}</Text>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={playlist.audios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <AudioMenuItem
              activeListItem={item.id === context.currentAudio.id}
              duration={item.duration}
              isPlaying={context.isPlaying}
              onAudioPress={() => playAudio(item)}
              title={item.filename}
            />
          </View>
        )}
      />
    </View>
    //   <View style={[StyleSheet.absoluteFillObject, styles.modalBG]} />
    // </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
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
