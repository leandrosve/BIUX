import { Box, List, ListProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends ListProps {
  emptyPlaceholder?: string | ReactNode;
  children?: ReactNode[];
}

const BList = ({ emptyPlaceholder, children, ...props }: Props) => {
  if (!children?.length && emptyPlaceholder) {
    return (
      <Box textAlign='center' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        {emptyPlaceholder}
      </Box>
    );
  }
  return <List {...props}>{children}</List>;
};

export default BList;
