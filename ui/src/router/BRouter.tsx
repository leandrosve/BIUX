import { ReactElement, Suspense, useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import routes, { BRoutes } from './routes';
import { SessionContext } from '../context/SessionProvider';
import Layout from '../layout/Layout';
import { Flex, Spinner } from '@chakra-ui/react';

const BRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map((route) => {
            const key = `${route.type}-${route.path}`;
            return (
              <Route
                path={route.path}
                key={key}
                element={<RouteProtection type={route.type} element={<Suspense fallback={<Fallback />}>{route.element}</Suspense>} />}
              />
            );
          })}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

const Fallback = () => (
  <Flex grow={1} align='center' justify={'center'}>
    <Spinner mt={5} size='xl' color='primary.400' boxSize={['50px', 100]} />
  </Flex>
);
function RouteProtection({ type, element }: { type: string; element: ReactElement }) {
  const sessionContext = useContext(SessionContext);

  if (type == 'private' && !sessionContext.session) return <Navigate to={BRoutes.LOGIN} replace />;

  if (type == 'guest' && sessionContext.session) return <Navigate to={BRoutes.DASHBOARD} replace />;

  return <>{element}</>;
}

export default BRouter;
