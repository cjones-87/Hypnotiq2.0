import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import imageArray from '../../utils/browseFunctions/ImageArray';
import renderCategoryList from '../../utils/browseFunctions/RenderCategoryList';

const Browse = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'transparent',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          paddingTop: 22,
          textAlign: 'center',
        }}
      >
        <MaterialIcons
          name="pageview"
          style={{
            alignItems: 'center',
            color: 'yellow',
            justifyContent: 'center',
            padding: 10,
            textAlign: 'center',
          }}
        />
        <Text
          style={{
            alignItems: 'center',
            color: 'yellow',
            justifyContent: 'center',
            padding: 10,
            textAlign: 'center',
          }}
        >
          Browse Categories
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 52,
        }}
      >
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

const styles = StyleSheet.create({});

export default Browse;
