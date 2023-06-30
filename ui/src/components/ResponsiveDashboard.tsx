import { Flex, StepperProps, useMediaQuery } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

interface Props  {

    children:React.ReactNode
  }

  const styles: { [key: string]: React.CSSProperties } ={
    maxStyle:{
        display: "flex",
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        gap:'5px',
        padding:'1.8%',
        
    },
    minStyle:{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "2fr",
        gridColumnGap: "20px",
        gridRowGap: '20px',
        justifyItems: 'stretch',
        alignItems: 'stretch',
        padding:'2%',
    }
  }

  export const ResponsiveDashBoard = ({ children,...props }: Props) => {
    const [isSmaller] = useMediaQuery('(max-width: 1150px)')
    {isSmaller ? 'smaller than 1510px' : ''}

  return (
        <>
    <div style={isSmaller ? styles.minStyle: styles.maxStyle}>
        {
            children
        }

</div>
        </>
  );
};

 
