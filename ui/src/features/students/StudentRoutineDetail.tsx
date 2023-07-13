import React, { useState, useEffect, useMemo } from 'react';
import ResponsiveCard from '../../components/common/ResponsiveCard';
import { useParams } from 'react-router-dom';
import Routine from '../../model/routines/Routine';
import { Box, Divider, Flex, FormControl, Heading, Icon, List, ListItem, Tag, Text, Tooltip, VisuallyHidden, Wrap, WrapItem } from '@chakra-ui/react';
import LinkButton from '../../components/common/LinkButton';
import { BRoutes } from '../../router/routes';
import { ArrowBackIcon, CalendarIcon, ChatIcon, InfoIcon, StarIcon } from '@chakra-ui/icons';
import SkeletonWrapper from '../../components/common/SkeletonWrapper';
import SimpleBreadcrumbs from '../../components/common/SimpleBreadcrumbs';
import BAlert from '../../components/common/BAlert';
import { RoutineDetailLabel } from '../routines/RoutineDetails';
import { BikeIcon, StopwatchIcon, ThumbUpIcon, TrainingDetailIcon } from '../../components/common/Icons';
import RoutineSegmentList from '../routines/RoutineSegmentList';
import ResourceNotFound from '../../components/common/ResourceNotFound';
import RoutineUtils from '../../utils/RoutineUtils';
import StudentService from '../../services/api/StudentService';

const StudentRoutineDetails = () => {
  let { id } = useParams();
  const [routine, setRoutine] = useState<Routine>(); // Original
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  const retrieveRoutine = async (id: number) => {
    const res = await StudentService.getRoutineDetail(id);
    if (res.hasError) {
      setLoading(false);
      return;
    }
    setRoutine(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (!id || !Number(id)) {
      setLoading(false);
      return;
    }
    retrieveRoutine(Number(id));
  }, [id]);
  if (!loading && !routine)
    return <ResourceNotFound defaultWidth='600px' defaultHeight='600px' backButtonProps={{ label: 'Volver al inicio', to: BRoutes.DASHBOARD }} />;
  return (
    <ResponsiveCard defaultHeight='auto' position='relative' defaultWidth='800px'>
      <SimpleBreadcrumbs
        items={[
          { to: BRoutes.STUDENT_ROUTINES, title: 'Rutinas' },
          { to: '#contenido', title: 'Detalle' },
        ]}
      />
      <SkeletonWrapper loading={loading} heights={['60px', '90px', '60px']} height='70px' repeat={7} marginY={1}>
        <Flex justifyContent='space-between' mb={3} alignItems='center'>
          <LinkButton to={BRoutes.STUDENT_ROUTINES} leftIcon={<ArrowBackIcon />} size={['sm', 'md']}>
            Volver al listado
          </LinkButton>
        </Flex>
        <BAlert status='success' description={successMessage} autoFocus closable onClose={() => setSuccessMessage('')} />
        {routine && <RoutineDetailsContent routine={routine} />}
      </SkeletonWrapper>
    </ResponsiveCard>
  );
};

interface RoutineDetailsContentProps {
  routine: Routine;
}

const RoutineDetailsContent = ({ routine }: RoutineDetailsContentProps) => {
  const segments = useMemo(() => RoutineUtils.initializeSegments(routine.segments), [routine]);

  const totalDuration = useMemo(() => {
    let total = 0;
    segments.forEach((s) => (total += s.duration));
    return total;
  }, segments);

  return (
    <Flex direction='column'>
      <FormControl>
        <RoutineDetailLabel htmlFor='routine-name' mb={0}>
          Nombre
        </RoutineDetailLabel>
        <Heading aria-label='Routine Name' color='text.500'>
          {routine.name}
        </Heading>
      </FormControl>
      {routine.description && (
        <FormControl>
          <RoutineDetailLabel htmlFor='routine-description' mb={0}>
            Descripción
          </RoutineDetailLabel>
          <Heading size='md' as='h2' paddingY={2} color='text.500'>
            {routine.description}
          </Heading>
        </FormControl>
      )}
      <Box position='relative' marginTop={2}>
        <Flex justifyContent='space-between' alignItems='start' marginBottom={1}>
          <RoutineDetailLabel marginTop={0} marginBottom={0}>
            Planificación
          </RoutineDetailLabel>
          {!!Number(totalDuration) && (
            <Tag colorScheme='blue' fontWeight='bold' borderRadius='20px' paddingY='3px'>
              <Icon as={StopwatchIcon} aria-hidden mr={1} />
              Duración total: {`${totalDuration}`} min
            </Tag>
          )}
        </Flex>
        {!!segments?.length ? (
          <Box background='bg.400' borderRadius='lg' maxHeight='400px' overflowY='auto'>
            <RoutineSegmentList displayOnly={true} segments={segments} onChange={() => {}} onRemove={() => {}} onEdit={() => {}} />
          </Box>
        ) : (
          <Text>
            <InfoIcon aria-hidden mr={2} />
            Esta rutina no posee ningún segmento
          </Text>
        )}
      </Box>
      <RoutineDetailLabel mb={3}>Entrenamientos Recientes</RoutineDetailLabel>
      <PastTrainingList />
      <Flex margin='auto' mt={5} direction='column' justifyContent='end'>
        <LinkButton
          to={`#no-implementado`}
          alignSelf={{ base: 'stretch', lg: 'end' }}
          size='lg'
          alignItems='center'
          textAlign='center'
          colorScheme='primary'
          whiteSpace='normal'
          leftIcon={<Icon as={BikeIcon} boxSize={7} aria-hidden display={'inline-flex'} />}
        >
          Registrar Nuevo Entrenamiento
        </LinkButton>
      </Flex>
    </Flex>
  );
};

const pastTrainingsMock = [
  {
    date: '2023-07-10T02:03:52.743Z',
    score: 7,
    liked: true,
    instructorComment: 'Muy buen trabajo! sigue así',
  },
  {
    date: '2023-07-08T02:03:52.743Z',
    score: 4,
    instructorComment: 'Buen trabajo! Controlar RPM hacia el final',
  },
];

const formatStringDate = (stringDate: string) => {
  const date = new Date(stringDate);
  if (!date) return '';
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};
const PastTrainingList = () => {
  return (
    <List spacing={3}>
      {pastTrainingsMock.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem bg='bg.400' p={3} borderRadius='lg'>
            <Flex direction='column' alignItems='stretch' justifyContent='center' gap={3}>
              <Flex justifyContent='space-between'>
                <Text display='inline'>
                  <Tooltip hasArrow label='Comentario de tu instructor' placement='top'>
                    <Icon as={ChatIcon} boxSize={3} mt='-3px' mr={2} aria-label='Comentario de tu instructor' display='inline' />
                  </Tooltip>
                  {item.instructorComment}
                </Text>
                <LinkButton
                  to={`#no-implementado`}
                  size='sm'
                  whiteSpace='normal'
                  leftIcon={<Icon as={TrainingDetailIcon} boxSize={4}/>}
                >
                  Ver detalles
                </LinkButton>
              </Flex>
              <Flex alignSelf='stretch' justifyContent='space-between'>
                <Tooltip hasArrow label='Calificación' placement='top'>
                  <Tag fontSize='sm' borderRadius='25px' justifyContent='center' colorScheme='primary' aria-label='calificación' gap={1}>
                    <Icon as={StarIcon} aria-label='Calificación' /> {item.score}/10
                  </Tag>
                </Tooltip>
                <Tag variant='outline' fontWeight='bold' gap={2} boxShadow='none'>
                  <CalendarIcon aria-label='fecha' />
                  {formatStringDate(item.date)}
                </Tag>
              </Flex>
            </Flex>
          </ListItem>
          {index + 1 < pastTrainingsMock.length && <Divider _dark={{ display: 'none' }} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default StudentRoutineDetails;
