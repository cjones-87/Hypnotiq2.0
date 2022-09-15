import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 0.15, paddingTop: 10 }}>
        <TouchableOpacity style={styles.container}>
          <FontAwesome5 name="search" style={styles.icon} />
          <TextInput
            value={searchTerm}
            onChangeText={(searchTerm) => setSearchTerm(searchTerm)}
            placeholder={'Search by artist, song, or album'}
            placeholderTextColor={'rebeccapurple'}
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
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    backgroundColor: 'gray',
    color: 'rebeccapurple',
    height: 44,
    justifyContent: 'center',
    padding: 10,
    textAlignVertical: 'center',
  },
  input: {
    alignItems: 'center',
    backgroundColor: 'gray',
    color: 'rebeccapurple',
    height: 44,
    justifyContent: 'center',
    padding: 10,
    textAlignVertical: 'center',
  },
});

export default SearchBar;
