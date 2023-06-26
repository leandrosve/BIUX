import { ReactElement, Suspense, useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import routes, { BRoutes } from './routes';
import { SessionContext } from '../context/SessionProvider';
import Layout from '../layout/Layout';
import { Flex, Spinner } from '@chakra-ui/react';
import Role from '../model/user/Role';

const BRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map((route) => {
            const key = `${route.type}-${route.path}`;
            return (
              <Route
                path={`${route.path}${route.hasSubroutes ? '/*' : ''}`}
                key={key}
                element={
                  <RouteProtection type={route.type} role={route.role} element={<Suspense fallback={<Fallback />}>{route.element}</Suspense>} />
                }
              />
            );
          })}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

const Fallback = () => (
  <Flex grow={1} align='center' justify={'center'} alignSelf='stretch'>
    <Spinner mt={5} size='xl' color='primary.400' boxSize={['50px', 100]} />
  </Flex>
);
function RouteProtection({ type, element, role }: { type: string; element: ReactElement; role?: Role }) {
  const { session } = useContext(SessionContext);

  if (type == 'private' && !session) return <Navigate to={BRoutes.LOGIN} replace />;

  if (type == 'guest' && session) return <Navigate to={BRoutes.DASHBOARD} replace />;

  if (role && session?.user.role !== role) return <Navigate to={BRoutes.DASHBOARD} replace />;
  return <>{element}</>;
}

export default BRouter;
