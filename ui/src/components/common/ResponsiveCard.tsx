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
      alignSelf={{ base: 'center', md: 'auto' }}
      display='flex'
      marginX={[0, 5]}
      marginTop={0}
      paddingTop={6}
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
