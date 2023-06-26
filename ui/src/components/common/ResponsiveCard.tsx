import { Card, CardProps } from '@chakra-ui/react';

export interface ResponsiveCardProps extends CardProps {
  defaultWidth?: string | number;
  defaultHeight?: string | number;
}

const ResponsiveCard = ({ defaultWidth = 700, defaultHeight = 650, ...props }: ResponsiveCardProps) => {
  return (
    <Card
      boxShadow={{ base: 'none', md: 'base' }}
      background='bg.300'
      p='6'
      rounded={[0, 'lg']}
      minW={['100%', '100%', defaultWidth]}
      minHeight={['calc(100vh - 160px)', defaultHeight]}
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
