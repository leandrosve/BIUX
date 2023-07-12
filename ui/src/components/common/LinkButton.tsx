import { Button, ButtonProps } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

export interface LinkButtonProps extends ButtonProps {
  to: string;
  label?: string;
}
const LinkButton = ({ to, label, ...props }: LinkButtonProps) => {
  return (
    <Button as={ReactRouterLink} to={to} {...props}>
      {label}
      {props.children}
    </Button>
  );
};

export default LinkButton;
