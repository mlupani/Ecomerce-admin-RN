import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsScreen from '../screens/ProductsScreen';
import ProductScreen from '../screens/ProductScreen';
import CategoryScreen from '../screens/CategoryScreen';

export type productsNavigatorProps = {
  ProductsScreen: undefined;
  ProductScreen: { id?: string; name?: string };
  CategoryScreen: { id?: string; name?: string };
};

const stack = createStackNavigator<productsNavigatorProps>();

const ProductsNavigator = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name={'ProductsScreen'}
        component={ProductsScreen}
        options={{
          title: 'Seleccionar una categoria',
          cardStyle: {
            backgroundColor: 'white',
          },
          headerStyle: {
            elevation: 0,
            shadowColor: 'transparent',
          },
        }}
      />
      <stack.Screen
        name={'ProductScreen'}
        component={ProductScreen}
        options={{
          title: '',
          cardStyle: {
            backgroundColor: 'white',
          },
          headerStyle: {
            elevation: 0,
            shadowColor: 'transparent',
          },
        }}
      />
      <stack.Screen
        name={'CategoryScreen'}
        component={CategoryScreen}
        options={{
          title: '',
          cardStyle: {
            backgroundColor: 'white',
          },
          headerStyle: {
            elevation: 0,
            shadowColor: 'transparent',
          },
        }}
      />
    </stack.Navigator>
  );
};

export default ProductsNavigator;
