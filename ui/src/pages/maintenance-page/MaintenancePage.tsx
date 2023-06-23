import { Flex, Heading, Icon, Image, Text } from '@chakra-ui/react';
import ToggleThemeButton from '../../components/common/ToggleThemeButton';
import { BrandIcon } from '../../components/common/Icons';
import Footer from '../../layout/Footer';
import illustration from '../../assets/illustrations/maintenance.png';
import { useEffect } from 'react';
import StatusService from '../../services/api/StatusService';

const MaintenancePage = () => {
  useEffect(() => {
    const id = setInterval(() => {
      StatusService.checkStatus();
    }, 10000);
    return () => clearInterval(id);
  }, []);
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
      <Flex grow={1} alignItems='center' paddingX={[3, 10]}>
        <Flex shrink={0} alignItems={'center'} justifyContent={'center'} className='landing-page-illustration' marginTop={4}>
          <Image src={illustration} flexShrink={0} boxSize='400px' alt='Cyclist' transform='scaleX(-1)' className='hue-adaptative' />
        </Flex>
        <Flex direction='column' justifyContent='center' padding={[0, 10]} gap={5}>
          <Flex alignItems='flex-end' gap={3}>
            <Icon as={BrandIcon} height={'40px'} width={'40px'} />
            <Heading as='h1' fontWeight='light' fontSize={30} color='primary.950'>
              BIUX
            </Heading>
          </Flex>
          <Heading textAlign='start' display='inline-flex'>
            Estámos teniendo algunos problemas...
          </Heading>
          <Text align='start'>
            Lo sentimos, parece que no hemos podido conectar con nuestros servidores.
            <br /> Por favor, intenta nuevamente mas tarde.
          </Text>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default MaintenancePage;
