import { Button, ButtonProps } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface Props extends ButtonProps {
  to: string;
}
const LinkButton = ({ to, ...props }: Props) => {
  return (
    <Link to={to}>
      <Button as='span' {...props}>
        {props.children}
      </Button>
    </Link>
  );
}

export default LinkButton;
