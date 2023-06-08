import './App.css';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './lib/chakra-themes/theme';
import { RouterProvider } from 'react-router-dom';
import router from './router/routes';
import { useEffect } from 'react';
import AccesibilityService from './services/AccesibilityService';
import SessionProvider from './context/SessionProvider';
import BRouter from './router/BRouter';

function App() {
  useEffect(() => {
    AccesibilityService.initialize();
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider>
        <BRouter />
      </SessionProvider>
    </ChakraProvider>
  );
}

export default App;
