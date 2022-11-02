import React from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AudioMenuItem from '../audioMenu/AudioMenuItem';

import color from '../../../misc/color';

const PlaylistDetail = ({ onClose, playlist, visible }) => {
  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{playlist.title}</Text>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={playlist.audios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <AudioMenuItem duration={item.duration} title={item.filename} />
            </View>
          )}
        />
      </View>
      <View style={[StyleSheet.absoluteFillObject, styles.modalBG]} />
    </Modal>
  );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    bottom: 0,
    height: height - 150,
    position: 'absolute',
    width: width - 15,
  },
  listContainer: {
    padding: 20,
  },
  modalBG: {
    backgroundColor: color.MODAL_BG,
    zIndex: -1,
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
