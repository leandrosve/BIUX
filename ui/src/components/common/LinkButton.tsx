import { Button, ButtonProps } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

export interface LinkButtonProps extends ButtonProps {
  to: string;
  label?: string;
  external?: boolean;
}
const LinkButton = ({ to, label, external, ...props }: LinkButtonProps) => {
  return (
    <Button as={ReactRouterLink} to={to} {...props} target={external ? '_blank' : undefined}>
      {label}
      {props.children}
    </Button>
  );
};

export default LinkButton;
