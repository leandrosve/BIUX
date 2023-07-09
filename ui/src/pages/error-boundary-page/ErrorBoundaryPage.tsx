import { Component, ErrorInfo, ReactNode, useState } from 'react';
import { Button, Flex, Heading, Icon, Image, Text, Wrap, WrapItem } from '@chakra-ui/react';
import illustration from '../../assets/illustrations/missing-page.png';
import { ArrowBackIcon, RepeatIcon } from '@chakra-ui/icons';
import LinkButton from '../../components/common/LinkButton';
import ToggleThemeButton from '../../components/common/ToggleThemeButton';
import { BrandIcon } from '../../components/common/Icons';
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }

    return this.props.children;
  }
}

const ErrorPage = () => {
  const [loading, setLoading] = useState(false);
  const onDeleteData = () => {
    setLoading(true);
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = '';
    setTimeout(() => location.replace('/'), 2000);
  };
  return (
    <Flex grow={1} alignSelf='stretch' flexDirection='column'>
      <Flex justifyContent='space-between' paddingX={5} paddingY={3}>
        <Flex alignItems='flex-end' gap={3}>
          <Icon as={BrandIcon} height={'40px'} width={'40px'} />
          <Heading as='h1' fontWeight='light' fontSize={30} color='primary.950'>
            BIUX
          </Heading>
        </Flex>
      </Flex>
      <Flex direction='column' alignItems='center' justifyContent='center' p={2} grow={1}>
        <Heading textAlign='center'>Ha ocurrido un error</Heading>
        <Text align='center' maxWidth={600}>
          ¡Ups! No deberias estar viendo esto. Si te sigues encontrando con este problema, puedes intentar borrar los datos de navegación para este
          sitio.
        </Text>
        <Wrap justify='center' mt={5} spacing={5}>
          <WrapItem>
            <Button leftIcon={<RepeatIcon />} variant='outline' colorScheme='primary' onClick={() => location.reload()}>
              Recargar la página
            </Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme='primary' isLoading={loading} onClick={onDeleteData}>
              Borrar datos de navegación
            </Button>
          </WrapItem>
        </Wrap>
        <Flex alignItems={'center'} justifyContent={'center'} className='landing-page-illustration'>
          <Image src={illustration} alt='Cyclist' transform='scaleX(-1)' className='hue-adaptative' />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ErrorBoundary;
