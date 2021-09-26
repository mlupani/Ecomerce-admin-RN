import React from 'react';
import { View } from 'react-native';

const Background = () => {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#333',
        width: 1000,
        top: -400,
        height: 1200,
        transform: [
          {
            rotate: '-70deg',
          },
        ],
      }}
    />
  );
};

export default Background;
