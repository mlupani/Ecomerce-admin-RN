import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import WhiteLogo from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

interface Props extends StackScreenProps<any, any> {}

const RegisterScreen = ({ navigation }: Props) => {
  const { signUp } = useContext(AuthContext);

  const { email, password, name, onChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const onRegister = () => {
    signUp({ email, password, name });
    Keyboard.dismiss();
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#333' }}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <View style={loginStyles.formContainer}>
          {/* LOGO */}
          <WhiteLogo />

          <Text style={loginStyles.title}>Registro</Text>

          <Text style={loginStyles.label}>Nombre</Text>
          <TextInput
            placeholder={'Ingrese su Nombre'}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            keyboardType={'email-address'}
            underlineColorAndroid={'white'}
            selectionColor={'white'}
            autoCapitalize={'words'}
            value={name}
            style={{ color: 'white' }}
            onChangeText={val => onChange(val, 'name')}
            onSubmitEditing={onRegister}
          />

          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            placeholder={'Ingrese su email'}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            keyboardType={'email-address'}
            underlineColorAndroid={'white'}
            selectionColor={'white'}
            autoCapitalize={'none'}
            autoCorrect={false}
            value={email}
            style={{ color: 'white' }}
            onChangeText={val => onChange(val, 'email')}
            onSubmitEditing={onRegister}
          />

          <Text style={loginStyles.label}>Password</Text>
          <TextInput
            placeholder={'*******'}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid={'white'}
            selectionColor={'white'}
            secureTextEntry
            value={password}
            style={{ color: 'white' }}
            onChangeText={val => onChange(val, 'password')}
            onSubmitEditing={onRegister}
          />

          {/*Boton login*/}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onRegister}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                Registrar
              </Text>
            </TouchableOpacity>
          </View>

          {/*Boton Volver a login*/}
          <TouchableOpacity
            activeOpacity={0.8}
            style={loginStyles.buttonBack}
            onPress={() => navigation.replace('Login')}>
            <Icon name={'arrow-back-outline'} size={35} color={'white'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;
