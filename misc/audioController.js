import { storeAudioForNextOpening } from './helper';

// play audio
export const play = async (playbackObj, uri) => {
  try {
    const status = await playbackObj.loadAsync({ uri }, { shouldPlay: true });

    return status;
  } catch (error) {
    console.log('error in play helper method', error.message);
  }
};

// pause audio
export const pause = async (playbackObj) => {
  try {
    const status = await playbackObj.setStatusAsync({
      shouldPlay: false,
    });

    return status;
  } catch (error) {
    console.log('error in pause helper method', error.message);
  }
};

// resume audio
export const resume = async (playbackObj) => {
  try {
    const status = await playbackObj.playAsync();

    return status;
  } catch (error) {
    console.log('error in resume helper method', error.message);
  }
};

// select another audio
export const playNext = async (playbackObj, uri) => {
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();

    return await play(playbackObj, uri);
    // const status = await play(playbackObj, uri);
    // return status;
  } catch (error) {
    console.log('error in select another helper method', error.message);
  }
};

export const selectAudio = async (audio, context) => {
  const {
    audioFiles,
    currentAudio,
    onPlaybackStatusUpdate,
    playbackObj,
    soundObject,
    updateState,
  } = context;

  try {
    // when playing audio for the first time
    if (soundObject === null) {
      const status = await play(playbackObj, audio.uri);
      const index = audioFiles.indexOf(audio);

      updateState(context, {
        currentAudio: audio,
        currentAudioIndex: index,
        isPlaying: true,
        soundObject: status,
      });

      playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

      return storeAudioForNextOpening(audio, index);
    }

    // when wanting to pause audio
    if (
      soundObject.isLoaded &&
      soundObject.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await pause(playbackObj);

      return updateState(context, {
        isPlaying: false,
        soundObject: status,
      });
    }

    // when wanting to resume same audio
    if (
      soundObject.isLoaded &&
      !soundObject.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(playbackObj);

      return updateState(context, {
        isPlaying: true,
        soundObject: status,
      });
    }

    // when wanting to select another audio
    if (soundObject.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playbackObj, audio.uri);
      const index = audioFiles.indexOf(audio);

      updateState(context, {
        currentAudio: audio,
        currentAudioIndex: index,
        isPlaying: true,
        soundObject: status,
      });
      return storeAudioForNextOpening(audio, index);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const changeAudio = async (context, select) => {
  const {
    audioFiles,
    currentAudioIndex,
    playbackObj,
    totalAudioCount,
    updateState,
  } = context;

  try {
    const { isLoaded } = await playbackObj.getStatusAsync();
    const isFirstAudio = currentAudioIndex <= 0;
    const isLastAudio = currentAudioIndex + 1 === totalAudioCount;

    let audio;
    let index;
    let status;

    // for skip next

    if (select === 'next') {
      audio = audioFiles[currentAudioIndex + 1];

      if (!isLoaded && !isLastAudio) {
        index = currentAudioIndex + 1;
        status = await play(playbackObj, audio.uri);
      }

      if (isLoaded && !isLastAudio) {
        index = currentAudioIndex + 1;
        audio = audioFiles[index];

        status = await playNext(playbackObj, audio.uri);
      }

      if (isLastAudio) {
        index = 0;
        audio = audioFiles[index];

        if (isLoaded) {
          status = await playNext(playbackObj, audio.uri);
        } else {
          status = await play(playbackObj, audio.uri);
        }
      }
    }

    // for skip previous
    if (select === 'previous') {
      audio = audioFiles[currentAudioIndex - 1];

      if (!isLoaded && !isFirstAudio) {
        index = currentAudioIndex - 1;
        status = await play(playbackObj, audio.uri);
      }

      if (isLoaded && !isFirstAudio) {
        index = currentAudioIndex - 1;
        audio = audioFiles[index];

        status = await playNext(playbackObj, audio.uri);
      }

      if (isFirstAudio) {
        index = totalAudioCount - 1;
        audio = audioFiles[index];

        if (isLoaded) {
          status = await playNext(playbackObj, audio.uri);
        } else {
          status = await play(playbackObj, audio.uri);
        }
      }
    }

    updateState(context, {
      currentAudio: audio,
      currentAudioIndex: index,
      isPlaying: true,
      playbackDuration: null,
      playbackPosition: null,
      soundObject: status,
    });

    storeAudioForNextOpening(audio, index);
  } catch (error) {
    console.log(
      'error inside change audio method in audio controller',
      error.message
    );
  }
};
