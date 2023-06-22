import { Flex, Heading, Icon, Text } from '@chakra-ui/react';
import ToggleThemeButton from '../../components/common/ToggleThemeButton';
import { BrandIcon } from '../../components/common/Icons';
import Footer from '../../layout/Footer';

const MaintenancePage = () => {
  return (
    <Flex grow={1} alignSelf='stretch' flexDirection='column' alignItems='center' justifyContent='center'>
      <Flex alignSelf='stretch' justifyContent='space-between' paddingX={5} paddingY={3}>
        <Flex alignItems='flex-end' gap={3}>
          <Icon as={BrandIcon} height={'40px'} width={'40px'} />
          <Heading as='h1' fontWeight='light' fontSize={30} color='primary.950'>
            BIUX
          </Heading>
        </Flex>
        <ToggleThemeButton />
      </Flex>
      <Flex grow={1} alignItems='center'>
        <Flex direction='column' alignItems='center' justifyContent='center' padding={10}>
          <Icon as={BrandIcon} boxSize='50px' mb={5} />
          <Heading textAlign='center'>Algo salió mal</Heading>
          <Text align='center'>
            Lo sentimos, parece que no hemos podido conectar con nuestros servidores...
            <br /> Por favor, intenta nuevamente mas tarde.
          </Text>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default MaintenancePage;
