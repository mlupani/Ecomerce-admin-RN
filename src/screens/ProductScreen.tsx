import React, { useEffect, useContext, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { productsNavigatorProps } from '../navigator/ProductsNavigator';
import useCategories from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { productsContext } from '../context/productsContext';
import Button from '../components/Button';

interface Props
  extends StackScreenProps<productsNavigatorProps, 'ProductScreen'> {}

const ProductScreen = ({ route: { params }, navigation }: Props) => {
  const { name, id } = params;
  const { categories, isLoading } = useCategories();
  const {
    loadProductById,
    addProduct,
    updateProduct,
    uploadImage,
    categorySelected,
  } = useContext(productsContext);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [updating, setUpdating] = useState(false);
  const {
    _id,
    nombre,
    categoriaID,
    img,
    descripcion,
    precio,
    stock,
    form,
    onChange,
    setForm,
  } = useForm({
    _id: id,
    nombre: name,
    descripcion: '',
    precio: 0,
    stock: 0,
    categoriaID: '',
    img: '',
  });
  const [tempPhoto, setTempPhoto] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Nombre de producto',
    });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (!id) {
      setLoadingProduct(false);
      return;
    }
    const product = await loadProductById(id);
    setForm({
      _id: id,
      nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      stock: product.stock,
      categoriaID: product.categoria._id,
      img: product.img || '',
    });
    setLoadingProduct(false);
  };

  const saveOrUpdate = async () => {
    setUpdating(true);
    const tempCategoria = categoriaID ? categoriaID : categories[0]._id;
    if (id) {
      await updateProduct(
        id,
        tempCategoria,
        nombre || '',
        descripcion,
        stock,
        precio,
      );
      setUpdating(false);
    } else {
      const newProd = await addProduct(
        tempCategoria,
        nombre || '',
        descripcion,
        stock,
        precio,
      );
      onChange(newProd._id, '_id');
      setUpdating(false);
    }
  };

  const takePhoto = () => {
    launchCamera(
      {
        quality: 0.5,
        mediaType: 'photo',
      },
      resp => {
        if (resp.didCancel) {
          return false;
        }
        if (resp.uri !== undefined) {
          setTempPhoto(resp.uri);
          uploadImage(resp, _id!);
        }
      },
    );
  };

  const takePhotoFromGallery = () => {
    launchImageLibrary(
      {
        quality: 0.5,
        mediaType: 'photo',
      },
      resp => {
        if (resp.didCancel) {
          return false;
        }
        if (resp.uri !== undefined) {
          setTempPhoto(resp.uri);
          uploadImage(resp, _id!);
        }
      },
    );
  };

  if (isLoading || loadingProduct) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={'black'} size={50} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, marginTop: 20, marginHorizontal: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {img.length > 0 || tempPhoto ? (
          <Image
            source={{ uri: tempPhoto ? tempPhoto : img }}
            resizeMode={'contain'}
            style={{
              flex: 1,
              height: 250,
              width: 250,
              borderRadius: 50,
              marginBottom: 20,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          />
        ) : null}

        {_id ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 20,
            }}>
            <Button text={'Tomar foto'} onPress={takePhoto} />
            <Button
              text={'Seleccionar una imagen'}
              onPress={takePhotoFromGallery}
            />
          </View>
        ) : null}

        <Text style={{ fontSize: 16 }}>Nombre del producto</Text>
        <TextInput
          placeholder={'Nombre del producto'}
          placeholderTextColor="#beb9b9"
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            borderRadius: 100,
            paddingLeft: 20,
            marginVertical: 20,
            color: 'black',
          }}
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
        />

        <Text style={{ fontSize: 16 }}>Descripcion del producto</Text>
        <TextInput
          multiline={true}
          numberOfLines={3}
          placeholder={'Descripcion del producto'}
          placeholderTextColor="#beb9b9"
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            borderRadius: 40,
            paddingLeft: 20,
            marginVertical: 20,
            color: 'black',
          }}
          value={descripcion}
          onChangeText={value => onChange(value, 'descripcion')}
        />

        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Categoria</Text>

        <Picker
          selectedValue={categoriaID ? categoriaID : categorySelected?._id}
          onValueChange={value => onChange(value, 'categoriaID')}>
          {categories.map(cat => (
            <Picker.Item key={cat._id} label={cat.nombre} value={cat._id} />
          ))}
        </Picker>

        <Text style={{ fontSize: 16 }}>Precio</Text>
        <TextInput
          placeholder={'Precio'}
          placeholderTextColor="#beb9b9"
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            borderRadius: 100,
            paddingLeft: 20,
            marginVertical: 20,
            color: 'black',
          }}
          value={precio.toString()}
          onChangeText={value => onChange(value, 'precio')}
        />

        <Text style={{ fontSize: 16 }}>Stock</Text>
        <TextInput
          placeholder={'Stock'}
          placeholderTextColor="#beb9b9"
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            borderRadius: 100,
            paddingLeft: 20,
            marginVertical: 20,
            color: 'black',
          }}
          value={stock.toString()}
          onChangeText={value => onChange(value, 'stock')}
        />

        <View style={{ marginBottom: 20 }}>
          {updating ? (
            <ActivityIndicator color={'black'} size={50} />
          ) : (
            <Button text={'Guardar'} onPress={saveOrUpdate} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductScreen;
