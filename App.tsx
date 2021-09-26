import React from 'react';
import StackNavigator from './src/navigator/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/authContext';
import { ProductsContextProvider } from './src/context/productsContext';
import { CategoryContextProvider } from './src/context/categoriesContext';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ProductsContextProvider>
          <CategoryContextProvider>
            <StackNavigator />
          </CategoryContextProvider>
        </ProductsContextProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
