import ResponsiveCard from '../../components/common/ResponsiveCard';
import { Collapse, Divider, Flex, Heading, Icon, IconButton, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import { ChevronUpIcon, InfoIcon } from '@chakra-ui/icons';
import { BrandIcon } from '../../components/common/Icons';

const InstructorWelcome = () => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: !sessionStorage.getItem('welcome-hidden') });

  const handleClose = () => {
    sessionStorage.setItem('welcome-hidden', 'true');
    onClose();
  };
  return (
    <Collapse in={isOpen}>
      <ResponsiveCard defaultHeight='auto' defaultWidth='1000px' minHeight='auto' marginBottom={5}>
        <Flex gap={5}>
          <Flex direction='column'>
            <Flex alignItems='center' gap={2}>
              <Icon as={BrandIcon} boxSize={6} aria-hidden/>
              <Heading size='md'>Bienvenido a BIUX!</Heading>
            </Flex>
            <Text>Ya puedes comenzar a crear invitar alumnos, crear rutinas, y asignarlas a tus alumnos!</Text>
            <Divider marginY={3} />
            <Text color='text.300' fontSize='sm'>
              <Icon as={InfoIcon} marginRight={2} />
              Esta aplicación es un prototipo realizado con fines educativos, para aprender y poner en práctica conceptos del diseño de experiencia de
              usuario. Por favor ten en cuenta que puedes encontrate con funcionalidades incompletas y/o con diversos problemas a lo largo de la
              aplicación.
            </Text>
          </Flex>
          <Tooltip label='Ocultar'>
            <IconButton aria-label='ocultar' onClick={handleClose} size='lg' variant='ghost' icon={<ChevronUpIcon boxSize={6} />} />
          </Tooltip>
        </Flex>
      </ResponsiveCard>
    </Collapse>
  );
};

export default InstructorWelcome;
