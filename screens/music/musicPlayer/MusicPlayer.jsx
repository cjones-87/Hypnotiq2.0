import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

const MusicPlayer = ({ navigation }) => {
  const [sound, setSound] = useState();

  const playSound = async () => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({
      uri: 'https://firebasestorage.googleapis.com/v0/b/hypnotiq-2-0.appspot.com/o/AccessGrantedComputerVoice.mp3?alt=media&token=45bbfe9c-fca0-490d-b266-bda159d3df00',
    });
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  };

  const playSound2 = async () => {
    console.log('Loading Sound 2');
    const { sound } = await Audio.Sound.createAsync({
      uri: 'https://firebasestorage.googleapis.com/v0/b/hypnotiq-2-0.appspot.com/o/Alarm.mp3?alt=media&token=9b431b53-17b5-4d6c-a7e0-5ef29e43a149',
    });
    setSound(sound);
    console.log('Playing Sound 2');
    await sound.playAsync();
  };

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button
        title="Access Granted"
        onPress={() => {
          playSound();
        }}
        style={styles.icon}
      />
      <Button title="Blaring Alarm" onPress={playSound2} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  icon: {
    backgroundColor: 'pink',
    width: '100%',
  },
});

export default MusicPlayer;
