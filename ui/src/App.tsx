import './App.css';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './lib/chakra-themes/theme';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { useEffect } from 'react';
import AccesibilityService from './services/AccesibilityService';

function App() {
  useEffect(() => {
    AccesibilityService.initialize();
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
