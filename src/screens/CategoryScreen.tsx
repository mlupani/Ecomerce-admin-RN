import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  TextInput,
  ImageBackground,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { productsNavigatorProps } from '../navigator/ProductsNavigator';
import { categoryContext } from '../context/categoriesContext';
import { useForm } from '../hooks/useForm';
import { launchImageLibrary } from 'react-native-image-picker';
import Button from '../components/Button';

interface Props
  extends StackScreenProps<productsNavigatorProps, 'CategoryScreen'> {}

const CategoryScreen = ({ route: { params }, navigation }: Props) => {
  const { id, name } = params;
  const { loadCategoryById, addCategory, updateCategory, uploadImage } =
    useContext(categoryContext);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const { _id, nombre, descripcion, img, form, onChange, setForm } = useForm({
    _id: id,
    nombre: name || '',
    descripcion: '',
    img: '',
  });
  const [tempPhoto, setTempPhoto] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Nombre de categoria',
    });
  }, [nombre, navigation]);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    if (!id) {
      setLoadingCategory(false);
      return;
    }
    const category = await loadCategoryById(id);
    setForm({
      _id: id,
      nombre,
      descripcion: category.descripcion || '',
      img: category.img || '',
    });
    setLoadingCategory(false);
  };

  if (loadingCategory) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={'black'} size={50} />
      </View>
    );
  }

  const saveOrUpdate = async () => {
    setUpdating(true);
    if (id) {
      updateCategory(id, nombre, descripcion, img);
    } else {
      const newCategory = await addCategory(nombre, descripcion);
      onChange(newCategory._id, '_id');
    }
    setUpdating(false);
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

  return (
    <View style={{ flex: 1, marginTop: 20, marginHorizontal: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {img.length > 0 || tempPhoto ? (
          <View style={styles.container}>
            <ImageBackground
              imageStyle={{ borderRadius: 15 }}
              source={{ uri: tempPhoto ? tempPhoto : img }}
              resizeMode="cover"
              style={styles.image}>
              <Text style={styles.text}>{nombre}</Text>
            </ImageBackground>
          </View>
        ) : null}

        {_id ? (
          <View style={{ marginBottom: 20 }}>
            <Button
              text={
                tempPhoto ? 'Seleccionar otra imagen' : 'Seleccionar una imagen'
              }
              onPress={takePhotoFromGallery}
            />
          </View>
        ) : null}

        <Text style={{ fontSize: 16 }}>Nombre de la categoria</Text>
        <TextInput
          placeholder={'Nombre de la categoria'}
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

        <Text style={{ fontSize: 16 }}>Descripcion de la categoria</Text>
        <TextInput
          multiline={true}
          numberOfLines={3}
          placeholder={'Descripcion de la categoria'}
          placeholderTextColor="#beb9b9"
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            borderRadius: 100,
            paddingLeft: 20,
            marginVertical: 20,
            color: 'black',
          }}
          value={descripcion}
          onChangeText={value => onChange(value, 'descripcion')}
        />

        <View style={{ marginBottom: 20 }}>
          {updating ? (
            <ActivityIndicator color={'black'} size={50} />
          ) : (
            <Button text={'Guardar'} onPress={saveOrUpdate} />
          )}
        </View>

        {/*
                    <Text style={{marginTop: 50}}>
                        {
                            JSON.stringify(form, null, 5)
                        }
                    </Text>*/}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 200,
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 15,
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
    alignSelf: 'center',
    borderRadius: 15,
    padding: 12,
  },
});

export default CategoryScreen;
