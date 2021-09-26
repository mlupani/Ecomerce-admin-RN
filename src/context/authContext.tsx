import React, { createContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Usuario,
  cafeLoginProps,
  LoginResponse,
  cafeRegisterProps,
} from '../interfaces/interfaces';
import { authReducer, AuthState } from '../reducer/authReducer';
import productosAPI from '../api/productosApi';
import { useEffect } from 'react';

type authContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checked' | 'authenticated' | 'not-authenticated' | 'checking';
  signUp: (obj: cafeRegisterProps) => void;
  signIn: (obj: cafeLoginProps) => void;
  logOut: () => void;
  removeError: () => void;
};

const initialState: AuthState = {
  status: 'checking',
  token: null,
  errorMessage: '',
  user: null,
};

export const AuthContext = createContext({} as authContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    checkToken();
  }, []);

  const signIn = async ({ correo, password }: cafeLoginProps) => {
    try {
      const resp = await productosAPI.post<LoginResponse>('/auth/loginAdmin', {
        correo,
        password,
      });
      const { token, usuario } = resp.data;
      dispatch({ type: 'signUp', payload: { token, user: usuario } });

      await AsyncStorage.setItem('token', token);
    } catch (error) {
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Informacion incorrecta',
      });
    }
  };

  const removeError = () => {
    dispatch({ type: 'removeError' });
  };

  const signUp = async ({ name, email, password }: cafeRegisterProps) => {
    try {
      const resp = await productosAPI.post<LoginResponse>('/usuarios', {
        nombre: name,
        correo: email,
        password,
        rol: 'ADMIN_ROLE',
      });
      const { token, usuario } = resp.data;
      dispatch({ type: 'signUp', payload: { token, user: usuario } });

      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Informacion incorrecta',
      });
    }
  };

  const logOut = async () => {
    dispatch({ type: 'logout' });
    await AsyncStorage.removeItem('token');
  };

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return dispatch({ type: 'notAuthenticated' });
    }

    const resp = await productosAPI.get<LoginResponse>('/auth');
    if (resp.status !== 200) {
      return dispatch({ type: 'notAuthenticated' });
    }

    await AsyncStorage.setItem('token', resp.data.token);

    dispatch({
      type: 'signUp',
      payload: { token: resp.data.token, user: resp.data.usuario },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
