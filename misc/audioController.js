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
