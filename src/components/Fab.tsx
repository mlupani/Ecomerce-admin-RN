import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const Fab = ({ iconName, onPress, style = {} }: Props) => {
  return (
    <View style={{ ...(style as any) }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.blackButton}>
        <Icon name={iconName} size={35} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default Fab;

const styles = StyleSheet.create({
  blackButton: {
    backgroundColor: 'black',
    borderRadius: 100,
    width: 50,
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
  },
});
