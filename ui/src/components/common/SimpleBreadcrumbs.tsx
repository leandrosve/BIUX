import { PropsWithChildren, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import ReactDOM from 'react-dom';
import { BRoutes } from '../../router/routes';

interface Props {
  items: SimpleBreadcrumbItem[];
  absolute?: boolean;
}
interface SimpleBreadcrumbItem {
  title: string;
  to?: string | BRoutes;
}
const SimpleBreadcrumbs = ({ items, absolute }: Props) => {
  return ReactDOM.createPortal(
    <Breadcrumb separator={<ChevronRightIcon role='img' />} padding={[3, 3]}>
      {!absolute && <BreadcrumbItem>
        <Link to='/'>
          <BreadcrumbLink as='span'>Inicio</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>}
      {items.map(({title, to='#contenido'}) => (
        <BreadcrumbItem key={to}>
          <Link to={to}>
            <BreadcrumbLink isCurrentPage href={to} as='span'>
              {title}
            </BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>,
    (document.getElementById('breadcrumb-container') as HTMLElement) ?? document.body
  );
};

export default SimpleBreadcrumbs;
