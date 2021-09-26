import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { productsContext } from '../context/productsContext';
import { StackScreenProps } from '@react-navigation/stack';
import { productsNavigatorProps } from '../navigator/ProductsNavigator';
import { Picker } from '@react-native-picker/picker';
import useCategories from '../hooks/useCategories';
import { Categoria } from '../interfaces/interfaces';
import Fab from '../components/Fab';
import { AuthContext } from '../context/authContext';
import { Image, TextInput } from 'react-native';
import useDebauncedValue from '../hooks/useDebauncedValue';

interface Props
  extends StackScreenProps<productsNavigatorProps, 'ProductsScreen'> {}

const ProductsScreen = ({ navigation }: Props) => {
  const {
    products,
    loadProducts,
    updateCategorySelected,
    categorySelected,
    loadingProducts,
    searchProduct,
  } = useContext(productsContext);
  const [refresh, setRefresh] = useState(false);
  const { categories, isLoading } = useCategories();
  const { logOut } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const debauncedValue = useDebauncedValue(search);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (debauncedValue.length > 2) {
      searchProduct(
        debauncedValue,
        categorySelected?._id ? categorySelected?._id : null,
        setSearching,
      );
    } else {
      if (!debauncedValue.length) {
        loadProducts();
      }
    }
  }, [debauncedValue]);

  const onRefresh = async () => {
    setRefresh(true);
    await loadProducts();
    setRefresh(false);
  };

  const changeProducts = (category: Categoria) => {
    updateCategorySelected(category);
    setSearch('');
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate('CategoryScreen', {})}>
          <Text>Agregar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={{ flex: 1, marginHorizontal: 15 }}>
      <TextInput
        onChangeText={setSearch}
        value={search}
        placeholderTextColor="#beb9b9"
        placeholder={
          categorySelected?._id
            ? `Buscar en ${categorySelected?.nombre}`
            : 'Buscar'
        }
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          borderRadius: 100,
          paddingLeft: 20,
          marginVertical: 20,
          color: 'black',
        }}
      />
      <View
        style={{
          marginBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{ width: '85%' }}>
          <Picker
            dropdownIconColor="#666"
            selectedValue={categorySelected?._id}
            onValueChange={value =>
              changeProducts(categories.filter(cat => cat._id === value)[0])
            }>
            <Picker.Item label="Seleccionar una opcion" value="" />
            {categories.map(cat => (
              <Picker.Item key={cat._id} label={cat.nombre} value={cat._id} />
            ))}
          </Picker>
        </View>
        <View style={{ flex: 1, width: 50 }}>
          {categorySelected?._id ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('CategoryScreen', {
                  id: categorySelected?._id,
                  name: categorySelected?.nombre,
                })
              }>
              <Text style={{ fontSize: 16 }}>Editar</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {!products.length &&
      !loadingProducts &&
      categorySelected &&
      !searching ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18 }}>Sin resultados</Text>
        </View>
      ) : !loadingProducts && !searching ? (
        <FlatList
          style={{ marginBottom: 50 }}
          data={products}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('ProductScreen', {
                  id: item._id,
                  name: item.nombre,
                })
              }>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{ width: 250 }}>
                  <Text style={{ fontSize: 16 }}>{item.nombre}</Text>
                  <Text style={{ fontSize: 16 }}>${item.precio}</Text>
                  <Text style={{ fontSize: 16 }}>Stock: {item.stock}</Text>
                </View>
                {item?.img ? (
                  <Image
                    source={{ uri: item?.img }}
                    resizeMode={'contain'}
                    style={{
                      flex: 1,
                      height: 150,
                      width: 150,
                      borderRadius: 50,
                      marginBottom: 20,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}
                  />
                ) : (
                  <Text>No Image</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={() => (
            <View
              style={{
                marginVertical: 5,
                borderBottomWidth: 2,
                borderBottomColor: 'rgba(0,0,0,0.2)',
              }}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
              progressViewOffset={10}
              progressBackgroundColor={'white'}
              colors={['black', 'red', 'green', 'blue']}
            />
          }
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={50} color={'#5856D6'} />
        </View>
      )}

      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20 }}>
        <Fab
          iconName={'arrow-back'}
          onPress={logOut}
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}
        />

        <Fab
          iconName={'add'}
          onPress={() =>
            navigation.navigate('ProductScreen', { id: '', name: '' })
          }
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        />
      </View>
    </View>
  );
};

export default ProductsScreen;
