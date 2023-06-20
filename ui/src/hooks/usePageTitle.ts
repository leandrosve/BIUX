import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import routes from '../router/routes';

const usePageTitle = () => {
  const location = useLocation();
  useEffect(() => {
    // const route = routes.find((r) => r.path === location.pathname);
    const pathname = location.pathname;
    const route = routes.find((r) => r.path === pathname || pathname.includes(`${r.path}/`));
    if (!route) {
      document.title = 'BIUX - Página no encontrada';
      return;
    }
    let title = 'BIUX' + (route.title ? ` - ${route.title}` : '');

    if (route.hasSubroutes) {
      const subroute = route.subroutes?.find((sr) => pathname.includes(`${route.path}/${sr.path}`));
      if (subroute) title = 'BIUX - ' + subroute.title;
    }
    document.title = title;
  }, [location]);
};

export default usePageTitle;
