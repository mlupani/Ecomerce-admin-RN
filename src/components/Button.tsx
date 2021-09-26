import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Text,
} from 'react-native';

interface Props {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const Button = ({ text, onPress, style = {} }: Props) => {
  return (
    <View style={{ ...(style as any) }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.Button}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  Button: {
    backgroundColor: '#f7941d',
    borderRadius: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 9,
    paddingHorizontal: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});
