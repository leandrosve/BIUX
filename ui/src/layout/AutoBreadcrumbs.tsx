import React, { Children, PropsWithChildren, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import routes from '../router/routes';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

const AutoBreadcrumbs = (props: PropsWithChildren) => {
  const location = useLocation();

  const item = useMemo(() => {
    const route = routes.find((r) => r.path === location.pathname);
    if (!route?.title) return null;
    return { path: route.path, title: route.title };
  }, [location]);

  if (!item) return null;
  return (
    <Breadcrumb separator={<ChevronRightIcon />} padding={[3, 3]}>
      <BreadcrumbItem>
        <Link to="/">
          <BreadcrumbLink as='span'>Inicio</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link to={item.path}>
          <BreadcrumbLink isCurrentPage href={item.path} as='span'>
            {item.title}
          </BreadcrumbLink>
        </Link>
      </BreadcrumbItem>
      {props.children}
    </Breadcrumb>
  );
};

export default AutoBreadcrumbs;
