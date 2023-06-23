import { PropsWithChildren, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import routes from '../router/routes';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import ReactDOM from "react-dom";

const AutoBreadcrumbs = (props: PropsWithChildren) => {
  const location = useLocation();

  const items = useMemo(() => {
    const pathname = location.pathname;
    const route = routes.find((r) => r.path === pathname || pathname.includes(`${r.path}/`));

    if (!route?.title) return [];
    const breadcrumbItems = [{ path: route.path, title: route.title }];

    if (route.hasSubroutes) {
      const subroute = route.subroutes?.find((sr) => pathname.includes(`${route.path}/${sr.path}`));
      if (subroute) breadcrumbItems.push(subroute);
    }
    return breadcrumbItems;
  }, [location]);

  if (!items.length) return null;
  return ReactDOM.createPortal(
    <Breadcrumb separator={<ChevronRightIcon role='img' />} padding={[3, 3]}>
      <BreadcrumbItem>
        <Link to='/'>
          <BreadcrumbLink as='span'>Inicio</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>
      {items.map((item) => (
        <BreadcrumbItem key={item.path}>
          <Link to={item.path}>
            <BreadcrumbLink isCurrentPage href={item.path} as='span'>
              {item.title}
            </BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
      ))}

      {props.children}
    </Breadcrumb>,
    document.getElementById('breadcrumb-container') as HTMLElement ?? document.body
  );
};

export default AutoBreadcrumbs;
