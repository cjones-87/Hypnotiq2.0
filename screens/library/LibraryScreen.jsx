import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import PlaylistInputModal from '../../components/music/playlistModal/PlaylistInputModal';

import color from '../../misc/color';

const backgroundImage = require('../../assets/favicon.png');

const LibraryScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.playlistBanner}>
          <Text>My Favorite</Text>
          <Text style={styles.audioCount}>0 songs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ marginTop: 15 }}
        >
          <Text style={styles.playlistButton}>+ Add New Playlist</Text>
        </TouchableOpacity>

        <PlaylistInputModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
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
