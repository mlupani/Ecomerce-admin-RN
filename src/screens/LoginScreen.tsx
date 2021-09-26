import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Background from '../components/Background';
import WhiteLogo from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/authContext';

interface Props extends StackScreenProps<any, any> {}

const LoginScreen = ({ navigation }: Props) => {
  const { signIn, errorMessage, removeError } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      Alert.alert('Login incorrecto', errorMessage, [
        { text: 'Ok', onPress: removeError },
      ]);
    }
  }, [errorMessage, removeError]);

  const { email, password, onChange } = useForm({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    setLoading(true);
    Keyboard.dismiss();
    await signIn({ correo: email, password });
    setLoading(false);
  };

  return (
    <>
      {/*BACKGROUND*/}
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <View style={loginStyles.formContainer}>
          {/* LOGO */}
          <WhiteLogo />

          <Text style={loginStyles.title}>Login</Text>

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
            onSubmitEditing={onLogin}
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
            onSubmitEditing={onLogin}
          />

          {/*Boton login*/}
          <View style={loginStyles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size={35} color={'white'} />
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={loginStyles.button}
                onPress={onLogin}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  Login
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/*Boton Nueva Cuenta*/}
          <View
            style={{ ...loginStyles.buttonContainer, alignItems: 'flex-end' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={() => navigation.replace('Register')}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                Nueva Cuenta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
