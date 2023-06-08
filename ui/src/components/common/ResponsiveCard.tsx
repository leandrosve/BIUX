import { Card, CardProps } from '@chakra-ui/react';

interface Props extends CardProps {
  defaultWidth?: string | number;
  defaultHeight?: string | number;
}

const ResponsiveCard = ({ defaultWidth = 700, defaultHeight = 650, ...props }: Props) => {
  return (
    <Card
      boxShadow={{ base: 'none', md: 'base' }}
      background='bg.300'
      p='6'
      rounded={[0, 40]}
      minW={['100%', '100%', defaultWidth]}
      minHeight={['calc(100vh - 110px)', defaultHeight]}
      alignSelf='center'
      display='flex'
      m={[0, 5]}
      paddingTop={[0, 6]}
      position='relative'
      flexDirection='column'
      maxWidth='100vw'
      {...props}
    >
      {props.children}
    </Card>
  );
};

export default ResponsiveCard;
