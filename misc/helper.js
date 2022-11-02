import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAudioForNextOpening = async (audio, index) => {
  await AsyncStorage.setItem('previousAudio', JSON.stringify({ audio, index }));
};

export const convertTime = (minutes) => {
  if (minutes) {
    const hours = minutes / 60;
    const minute = hours.toString().split('.')[0];

    // const percent = parseInt(hours.toString().split('.')[1].slice(0, 2));
    const percent = Number(hours.toString().split('.')[1].slice(0, 2));

    const sec = Math.ceil((60 * percent) / 100);

    if (sec == 60) {
      return `${minute + 1}:00`;
    }

    if (Number(minute) < 10 && sec < 10) {
      return `${parseInt(minute, 10)}:0${sec}`;
    }

    if (Number(minute) < 10) {
      return `${parseInt(minute, 10)}:${sec}`;
    }

    if (sec < 10) {
      return `${parseInt(minute, 10)}:0${sec}`;
    }
    return `${parseInt(minute, 10)}:${sec}`;
  }
};
