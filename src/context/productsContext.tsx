import React, { createContext, useEffect, useState } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import productosAPI from '../api/productosApi';
import { Categoria } from '../interfaces/interfaces';
import { Producto, ProductsResponse } from '../interfaces/interfaces';

type productsContextProps = {
  products: Producto[];
  categorySelected: Categoria | undefined;
  loadProducts: () => Promise<void>;
  addProduct: (
    categoryID: string,
    productName: string,
    descripcion: string,
    stock: number,
    precio: number,
  ) => Promise<Producto>;
  updateProduct: (
    productID: string,
    categoryID: string,
    productName: string,
    descripcion: string,
    stock: number,
    precio: number,
  ) => Promise<void>;
  deleteProduct: (productID: string) => Promise<void>;
  loadProductById: (productID: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>;
  updateCategorySelected: (category: Categoria) => void;
  searchProduct: (
    termino: string,
    categoria: string,
    callback: any,
  ) => Promise<void>;
  loadingProducts: boolean;
};

export const productsContext = createContext({} as productsContextProps);

export const ProductsContextProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [categorySelected, setCategorySelected] = useState<Categoria>();
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [categorySelected]);

  const updateCategorySelected = (category: Categoria) => {
    setCategorySelected(category);
  };

  const loadProducts = async () => {
    setLoadingProducts(true);
    if (categorySelected?._id) {
      try {
        const resp = await productosAPI.get<ProductsResponse>(
          `/productos/categoria/${categorySelected._id}`,
        );
        setProducts(resp.data.productos);
      } catch (error) {
        console.log(error);
      }
      setLoadingProducts(false);
    } else {
      setProducts([]);
      setLoadingProducts(false);
    }
  };

  const addProduct = async (
    categoryID: string,
    productName: string,
    descripcion: string,
    stock: number,
    precio: number,
  ): Promise<Producto> => {
    try {
      const resp = await productosAPI.post<Producto>('/productos', {
        categoria: categoryID,
        nombre: productName,
        descripcion,
        stock,
        precio,
      });
      setProducts([...products, resp.data]);
      return resp.data;
    } catch (error) {
      console.log(error);
      return null!;
    }
  };

  const updateProduct = async (
    productID: string,
    categoryID: string,
    productName: string,
    descripcion: string,
    stock: number,
    precio: number,
  ) => {
    try {
      const resp = await productosAPI.put<Producto>(`/productos/${productID}`, {
        categoria: categoryID,
        nombre: productName,
        descripcion,
        stock,
        precio,
      });
      loadProducts();
      setProducts(
        products.map(prod => (prod._id === productID ? resp.data : prod)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (productID: string) => {};

  const loadProductById = async (productID: string): Promise<Producto> => {
    const resp = await productosAPI.get<Producto>(`/productos/${productID}`);
    return resp.data;
  };

  const searchProduct = async (
    termino: string,
    categoria: string | null,
    callback: any,
  ): Promise<void> => {
    callback(true);
    if (typeof categoria === undefined) {
      categoria = null;
    }
    let resp = '';
    if (categoria) {
      resp = await productosAPI.get<Producto[]>(
        `/buscar/productos/${termino}/${categoria}`,
      );
    } else {
      resp = await productosAPI.get<Producto[]>(`/buscar/productos/${termino}`);
    }

    setProducts(resp.data.results);
    callback(false);
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
      const resp = await productosAPI.put<Producto>(
        `/uploads/productos/${id}`,
        formData,
      );
      setProducts(products.map(prod => (prod._id === id ? resp.data : prod)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <productsContext.Provider
      value={{
        products,
        categorySelected,
        searchProduct,
        loadingProducts,
        updateCategorySelected,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
      }}>
      {children}
    </productsContext.Provider>
  );
};
