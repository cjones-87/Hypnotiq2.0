import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="indigo" />
    </View>
  );
};

export default Spinner;
