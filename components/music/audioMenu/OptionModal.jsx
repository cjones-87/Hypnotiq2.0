import React from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import color from '../../../misc/color';

const OptionModal = ({
  currentItem,
  visible,
  onAddToPlaylist,
  onClose,
  onLike,
  onPlayPress,
  options,
}) => {
  const { filename } = currentItem;

  return (
    <>
      <Modal animationType="slide" transparent visible={visible}>
        <SafeAreaView style={styles.modal}>
          {/* <View>
            <Image></Image>
          </View> */}
          <View style={styles.modal}></View>
          <Text numberOfLines={2} style={styles.title}>
            {filename}
          </Text>
          <View style={styles.optionContainer}>
            {options.map((option) => {
              return (
                <TouchableOpacity key={option.title} onPress={option.onPress}>
                  <Text style={styles.option}>{option.title}</Text>
                </TouchableOpacity>
              );
            })}
            {/* <TouchableOpacity onPress={onPlayPress}>
              <Text style={styles.option}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLike}>
              <Text style={styles.option}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onAddToPlaylist}>
              <Text style={styles.option}>Add to Playlist</Text>
            </TouchableOpacity> */}
            {/* <Text style={styles.}>Add to Queue</Text>
            <Text style={styles.}>Go to Artist</Text>s
            <Text style={styles.}>Share</Text>
            <Text style={styles.}>Show Credits</Text> */}
          </View>
        </SafeAreaView>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBG} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  modal: {
    backgroundColor: color.APP_BG,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 1000,
  },
  modalBG: {
    backgroundColor: color.MODAL_BG,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  option: {
    color: color.FONT,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingVertical: 10,
  },
  optionContainer: { padding: 20 },
  title: {
    color: color.FONT_MEDIUM,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 0,
  },
});

export default OptionModal;
