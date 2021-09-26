export interface cafeLoginProps {
  correo: string;
  password: string;
}

export interface cafeRegisterProps {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  usuario: Usuario;
  token: string;
}

export interface Usuario {
  rol: string;
  estado: boolean;
  google: boolean;
  nombre: string;
  correo: string;
  uid: string;
  imagen?: string;
}

export interface ProductsResponse {
  total: number;
  productos: Producto[];
}

export interface Producto {
  precio: number;
  stock: number;
  _id: string;
  nombre: string;
  categoria: Categoria;
  descripcion: string;
  img?: string;
}

export interface CategoriasResponse {
  total: number;
  categorias: Categoria[];
}

export interface Categoria {
  _id: string;
  nombre: string;
  descripcion?: string;
  img?: string;
}

export interface Usuario {
  _id: string;
  nombre: string;
}
