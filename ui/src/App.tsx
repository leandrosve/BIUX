import './App.css';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './lib/chakra-themes/theme';
import { PropsWithChildren, useEffect, useState } from 'react';
import AccesibilityService from './services/AccesibilityService';
import SessionProvider from './context/SessionProvider';
import BRouter from './router/BRouter';
import APIService from './services/api/APIService';
import StatusService from './services/api/StatusService';

const EnsureInitialized = (props: PropsWithChildren) => {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if(initialized) return;
    AccesibilityService.initialize();
    APIService.initialize();
    StatusService.checkStatus();
    setInitialized(true);
  }, [initialized]);
  if (!initialized) return null;
  return <>{props.children}</>;
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <EnsureInitialized>
        <SessionProvider>
          <BRouter />
        </SessionProvider>
      </EnsureInitialized>
    </ChakraProvider>
  );
}

export default App;
