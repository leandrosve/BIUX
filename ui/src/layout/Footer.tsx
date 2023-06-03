import { Flex, Icon, Text, position, useColorMode } from '@chakra-ui/react';
import React, { CSSProperties } from 'react';
import { ArgentinaFlagIcon } from '../components/common/Icons';

const STYLES: CSSProperties = {
  position: 'absolute',
  display: 'flex',
  alignContent: 'center',
  alignItems: 'stretch',
  flexGrow: 1,
  justifyContent: 'stretch',
  height: '100%',
  width: '100%',
  zIndex: -1,
  //  minWidth: '900px',
  maxHeight: '130px',
};

const theme = {
  dark: ['var(--primary-500)', 'var(--primary-300)', 'black'],
  light: ['var(--primary-300)', 'var(--primary-500)', 'white'],
};

const Footer = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      as={'footer'}
      width={'100vw'}
      zIndex={1}
      position='relative'
      alignItems='flex-end'
      overflow='hidden'
      alignContent='center'
      height='130px'
      marginTop={-30}
    >
      <div style={{ ...STYLES }}>
        <svg
          style={STYLES}
          width='1440'
          height='144'
          viewBox='0 0 1440 144'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          preserveAspectRatio='none'
        >
          <rect x='-7' y='24.9999' width='1450' height='185' fill={theme[colorMode][0]} />
          <path
            d='M456.099 48.3491C174.767 26.1011 86.6896 40.172 -3.40064 10.9171C-12.2448 8.04515 -21.785 7.74952 -30.6294 10.6206C-46.7353 15.8488 -58.0071 30.3926 -59.0519 47.2934L-66.3979 166.125C-68.5366 200.721 -41.0004 229.928 -6.33863 229.827L1463.18 225.573C1480.87 225.522 1501 226.769 1502.53 209.152C1504.05 191.63 1503.94 160.407 1501.27 107.89C1500.29 88.6571 1490.22 70.8105 1472.82 62.5517C1303.91 -17.6325 920.909 -5.44657 720.37 22.6993L719.962 22.7566C667.606 30.1048 508.239 52.4724 456.099 48.3491Z'
            fill={theme[colorMode][1]}
          />
        </svg>
      </div>
      <Flex grow={1} alignItems='center' bg={theme[colorMode][1]} justifyContent='center' color={theme[colorMode][2]} gap={3} marginBottom={4}>
        <Icon as={ArgentinaFlagIcon} width={7} height={7} />
        <Text fontWeight='bold' as='h1'>DEDU 2023</Text>
      </Flex>
    </Flex>
  );
};

export default Footer;
