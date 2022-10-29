import React, { createContext } from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as MediaLibrary from 'expo-media-library';

import { DataProvider } from 'recyclerlistview';

export const AudioContext = createContext();

export default class AudioProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFiles: [],
      permissionError: false,
      dataProvider: new DataProvider((rule1, rule2) => rule1 !== rule2),
    };
  }

  permissionAlert = () => {
    Alert.alert('Permission Required', 'This app needs to read audio files!', [
      { onPress: () => this.getPermission(), text: 'I am ready' },
      { onPress: () => this.permissionAlert(), text: 'Cancel' },
    ]);
  };

  getPermission = async () => {
    // const permission = {
    //   accessPrivileges: 'none',
    //   canAskAgain: true,
    //   expires: 'never',
    //   granted: false,
    //   status: 'undetermined',
    // };
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      // we want all audio files
      this.getAudioFiles();
    }

    if (!permission.granted && !permission.canAskAgain) {
      this.setState({ ...this.state, permissionError: true });
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === 'denied' && canAskAgain) {
        this.permissionAlert(
          'user must allow this permission in order to work this app'
        );
      }
      if (status === 'granted') {
        // we want all audio files
        this.getAudioFiles;
      }

      if (status === 'denied' && !canAskAgain) {
        // we want to display an error to the user
        this.setState({ ...this.state, permissionError: true });
      }
    }
    console.log('permission', permission);
  };

  getAudioFiles = async () => {
    const { dataProvider, audioFiles } = this.state;

    let media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: media.totalCount,
    });

    this.setState({
      ...this.state,
      audioFiles: [...audioFiles, ...media.assets],
      dataProvider: dataProvider.cloneWithRows([
        ...audioFiles,
        ...media.assets,
      ]),
    });
    console.log('media', media);
  };

  componentDidMount() {
    this.getPermission();
  }

  render() {
    const { audioFiles, dataProvider, permissionError } = this.state;
    if (permissionError)
      return (
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            <Text style={styles.text}>
              You need to accept permission first!
            </Text>
          </View>
        </SafeAreaView>
      );

    return (
      <AudioContext.Provider value={{ audioFiles, dataProvider }}>
        {this.props.children}
      </AudioContext.Provider>
      //   <SafeAreaView style={styles.safeAreaView}>
      //     <StatusBar backgroundColor={'rebeccapurple'} hidden={false} />
      //     <View style={styles.container}>
      //       <TouchableOpacity style={styles.button}>
      //         <Text style={styles.text}>Audio Menu</Text>
      //       </TouchableOpacity>
      //     </View>
      //   </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 19,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  safeAreaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight / 10000,
  },
  text: {
    color: 'rebeccapurple',
    fontSize: 32,
    textAlign: 'center',
  },
});
