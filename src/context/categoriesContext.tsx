import React, { createContext, useEffect, useState } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import productosAPI from '../api/productosApi';
import { Categoria, CategoriasResponse } from '../interfaces/interfaces';

type categoryContextProps = {
  categories: Categoria[];
  loadCategoryById: (categoryID: string) => Promise<Categoria>;
  addCategory: (nombre: string, descripcion: string) => Promise<Categoria>;
  updateCategory: (
    id: string,
    nombre: string,
    descripcion: string,
    img: string,
  ) => void;
  uploadImage: (data: any, id: string) => Promise<void>;
};

export const categoryContext = createContext({} as categoryContextProps);

export const CategoryContextProvider = ({ children }: any) => {
  const [categories, setCategories] = useState<Categoria[]>([]);

  const loadCategoryById = async (categoryID: string): Promise<Categoria> => {
    const resp = await productosAPI.get<Categoria>(`/categorias/${categoryID}`);
    return resp.data;
  };

  const addCategory = async (
    nombre: string,
    descripcion: string,
  ): Promise<Categoria> => {
    try {
      const resp = await productosAPI.post<Categoria>('/categorias', {
        nombre,
        descripcion,
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      return null!;
    }
  };

  const uploadImage = async (data: ImagePickerResponse, id: string) => {
    const fileToUpload = {
      uri: data.uri,
      type: data.type,
      name: data.fileName,
    };

    const formData = new FormData();
    formData.append('archivo', fileToUpload);

    try {
      const resp = await productosAPI.put<Categoria>(
        `/uploads/categorias/${id}`,
        formData,
      );
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = (
    id: string,
    nombre: string,
    descripcion: string,
    img: string,
  ) => {};

  return (
    <categoryContext.Provider
      value={{
        categories,
        loadCategoryById,
        addCategory,
        updateCategory,
        uploadImage,
      }}>
      {children}
    </categoryContext.Provider>
  );
};
