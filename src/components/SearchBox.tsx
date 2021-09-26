import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Producto } from '../interfaces/interfaces';
import { useNavigation } from '@react-navigation/native';

const SearchBox = () => {
  const [search, setSearch] = useState('');

  const handleChange = (value: string) => {
    setSearch(value);
  };

  return (
    <TextInput
      onChangeText={handleChange}
      value={search}
      placeholder={'Buscar'}
      style={{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 100,
        paddingLeft: 20,
        marginVertical: 20,
        color: 'black',
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default SearchBox;
