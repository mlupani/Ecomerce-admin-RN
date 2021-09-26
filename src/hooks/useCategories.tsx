import { useEffect, useState } from 'react';
import productosAPI from '../api/productosApi';
import { Categoria, CategoriasResponse } from '../interfaces/interfaces';

const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Categoria[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const resp = await productosAPI.get<CategoriasResponse>('/categorias');
    setCategories(resp.data.categorias);
    setIsLoading(false);
  };

  return {
    categories,
    isLoading,
  };
};

export default useCategories;
