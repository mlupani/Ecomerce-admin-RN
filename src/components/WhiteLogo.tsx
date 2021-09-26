import React from 'react';
import { View, Image } from 'react-native';

const WhiteLogo = () => {
  return (
    <View>
      <Image
        source={require('../assets/logo2.png')}
        resizeMode="contain"
        style={{ width: 110, height: 100, alignSelf: 'center' }}
      />
    </View>
  );
};

export default WhiteLogo;
