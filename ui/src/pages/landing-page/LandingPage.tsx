import { Button, Flex, Heading, Icon, Image } from '@chakra-ui/react';
import illustration from '../../assets/illustrations/bike-female.png';
import { Link } from 'react-router-dom';
import { BRoutes } from '../../router/routes';
import './landing-page.css';
import LinkButton from '../../components/common/LinkButton';

const LandingPage = () => {
  return (
    <Flex alignItems='center' justifyContent='center' grow={1}>
      <Flex className='landing-page-content' direction='column' gap={5} padding={5} maxWidth={650} justifyContent='center'>
        <Heading as='h1' size='4xl' fontWeight='200'>
          BIUX
        </Heading>
        <Heading as='h1' size='3xl' fontWeight='light'>
          Controla el <br /> <b>progreso</b> de <br />
          tus <b>alumnos</b>
          <br /> <b>fácil</b> y <b>rápido</b>
        </Heading>

        <Flex>
          <LinkButton to={BRoutes.SIGNUP} colorScheme='primary' size='lg'  className='register-button'>
              Registrarme
          </LinkButton>
        </Flex>
      </Flex>

      <Flex alignItems={'center'} justifyContent={'center'} className='landing-page-illustration'>
        <Image src={illustration} alt='Cyclist' transform='scaleX(-1)' className='hue-adaptative' />
      </Flex>
    </Flex>
  );
};

export default LandingPage;
