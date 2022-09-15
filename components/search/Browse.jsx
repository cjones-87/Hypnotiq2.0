import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import imageArray from '../../utils/browseFunctions/ImageArray';
import renderCategoryList from '../../utils/browseFunctions/RenderCategoryList';

const Browse = () => {
  return (
    <SafeAreaView>
      <View style={styles.title}>
        <MaterialIcons name="pageview" style={styles.text} size={24} />
        <Text style={styles.text}>Browse Categories</Text>
        <MaterialIcons name="pageview" style={styles.text} size={24} />
      </View>
      <View style={styles.flatListView}>
        <FlatList
          data={imageArray()}
          numColumns={2}
          renderItem={renderCategoryList}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatListView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 75,
  },
  title: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    paddingTop: 22,
    textAlign: 'center',
    width: Dimensions.get('window').width,
  },
  text: {
    alignItems: 'center',
    color: 'yellow',
    fontSize: 24,
    justifyContent: 'center',
    padding: 10,
    textAlign: 'center',
  },
});

export default Browse;
