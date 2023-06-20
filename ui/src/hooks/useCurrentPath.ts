import { useLocation } from 'react-router-dom';
import routes from '../router/routes';
import { useMemo } from 'react';

const useCurrentPath = () => {
  const location = useLocation();

  const item = useMemo(() => {
    const pathname = location.pathname;
    const route = routes.find((r) => r.path === pathname || pathname.includes(`${r.path}/`));

    return { path: route?.path, title: route?.title };
  }, [location]);

  return item;
};

export default useCurrentPath;
