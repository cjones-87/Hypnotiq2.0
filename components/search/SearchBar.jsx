import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import color from '../../misc/color';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SafeAreaView>
      <View
        style={{
          paddingTop: 22,
        }}
      >
        <TouchableOpacity style={styles.container}>
          <FontAwesome5 name="search" style={styles.icon} />
          <TextInput
            value={searchTerm}
            onChangeText={(searchTerm) => setSearchTerm(searchTerm)}
            placeholder={'Search by artist, song, or album'}
            placeholderTextColor={color.ACTIVE_BG}
            style={styles.input}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  icon: {
    alignItems: 'center',
    backgroundColor: 'pink',
    color: color.ACTIVE_BG,
    height: 44,
    justifyContent: 'center',
    padding: 10,
    textAlignVertical: 'center',
  },
  input: {
    alignItems: 'center',
    backgroundColor: 'pink',
    color: color.ACTIVE_BG,
    height: 44,
    justifyContent: 'center',
    textAlignVertical: 'center',
    width: Dimensions.get('window').width - 32,
  },
});

export default SearchBar;
