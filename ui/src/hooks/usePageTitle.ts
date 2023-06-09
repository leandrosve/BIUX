import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import routes from '../router/routes';

const usePageTitle = () => {
  const location = useLocation();
  useEffect(() => {
    const route = routes.find((r) => r.path === location.pathname);
    if (route) {
      const title = 'BIUX' + (route.title ? ` - ${route.title}` : '');
      document.title = title;
      return;
    }
    document.title = 'BIUX - Página no encontrada';
    return;
  }, [location]);
};

export default usePageTitle;
