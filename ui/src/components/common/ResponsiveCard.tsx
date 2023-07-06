import { Card, CardProps } from '@chakra-ui/react';

export interface ResponsiveCardProps extends CardProps {
  defaultWidth?: string | number;
  defaultHeight?: string | number;
}

const getDefaultWidth = (value?: number | string) => {
  console.log("render")
  const max = '(100vw - 17rem)'
  value = Number(value) ? value + 'px' : value;
  return `calc(min(${max}, ${value}))`
}

const ResponsiveCard = ({ defaultWidth = 700, defaultHeight = 'auto', ...props }: ResponsiveCardProps) => {
  return (
    <Card
      boxShadow={{ base: 'none', md: 'base' }}
      background='bg.300'
      p='6'
      rounded={[0, 'lg']}
      alignSelf={{ base: 'center', md: 'auto' }}
      display='flex'
      marginX={{base:0, lg:5}}
      marginTop={0}
      paddingTop={6}
      position='relative'
      flexDirection='column'
      minHeight={['calc(100vh - 160px)', defaultHeight]}
      width={{base:'100%', lg:getDefaultWidth(defaultWidth)}}
      {...props}
    >
      {props.children}
    </Card>
  );
};

export default ResponsiveCard;
