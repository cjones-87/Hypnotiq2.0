import React, { useState } from 'react';

import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import color from '../../../misc/color';

const PlaylistInputModal = ({ onClose, onSubmit, visible }) => {
  const [playlistName, setPlaylistName] = useState('');

  const handleOnSubmit = () => {
    if (!playlistName.trim()) {
      onClose();
    } else {
      onSubmit(playlistName);
      setPlaylistName('');
      onClose();
    }
  };

  return (
    <Modal
      animationType="fade"
      removeClippedSubviews={false}
      transparent
      visible={visible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.inputContainer}>
          <Text style={{ color: color.ACTIVE_BG }}>Create New Playlist</Text>
          <TextInput
            onChangeText={(text) => setPlaylistName(text)}
            style={styles.input}
            value={playlistName}
          />

          <AntDesign
            color={color.ACTIVE_FONT}
            name="checkcircleo"
            onPress={handleOnSubmit}
            size={24}
            style={styles.submitIcon}
          />
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[StyleSheet.absoluteFillObject, styles.modalBG]} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  input: {
    borderBottomColor: color.ACTIVE_BG,
    borderBottomWidth: 1,
    fontSize: 18,
    paddingVertical: 5,
    width: width - 40,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: color.ACTIVE_FONT,
    backgroundColor: 'transparent',
    borderRadius: 10,
    height: 200,
    justifyContent: 'center',
    width: width - 20,
  },
  modalBG: {
    backgroundColor: color.MODAL_BG,
    zIndex: -1,
  },
  modalContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  submitIcon: {
    backgroundColor: color.ACTIVE_BG,
    borderRadius: 50,
    marginTop: 15,
    padding: 10,
  },
});

export default PlaylistInputModal;
