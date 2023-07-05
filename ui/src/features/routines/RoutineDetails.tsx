import { useState, useEffect, useRef } from 'react';
import ResponsiveCard from '../../components/common/ResponsiveCard';
import { useParams } from 'react-router-dom';
import Routine, { DraggableSegment } from '../../model/routines/Routine';
import { Alert, Box, Button, Collapse, Flex, FormControl, FormLabel, FormLabelProps, Heading, Image, Text, Tooltip } from '@chakra-ui/react';
import missingIllustration from '../../assets/illustrations/missing-page.png';
import LinkButton from '../../components/common/LinkButton';
import { BRoutes } from '../../router/routes';
import { ArrowBackIcon, InfoIcon } from '@chakra-ui/icons';
import SkeletonWrapper from '../../components/common/SkeletonWrapper';
import RoutineService from '../../services/api/RoutineService';
import RoutineSegmentList from './RoutineSegmentList';
import RoutineUtils from '../../utils/RoutineUtils';
import { EditIcon, EditOffIcon } from '../../components/common/Icons';
import useAlertDialog from '../../hooks/useAlertDialog';
import RoutineEditForm from './RoutineEditForm';
import BAlert from '../../components/common/BAlert';

const RoutineDetails = () => {
  let { id } = useParams();
  const [routine, setRoutine] = useState<Routine>(); // Original
  const [segments, setSegments] = useState<DraggableSegment[]>([]); // Or
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const editModeRef = useRef<HTMLButtonElement>(null);
  const dialog = useAlertDialog();

  const retrieveRoutine = async (id: number) => {
    const res = await RoutineService.getRoutineDetail(id);
    if (res.hasError) {
      setLoading(false);
      return;
    }
    setRoutine(res.data);
    setSegments(RoutineUtils.initializeSegments(res.data.segments));
    setLoading(false);
  };

  const toggleEditMode = () => {
    if (!editMode) {
      setSuccessMessage('');
      setEditMode(true);
      return;
    }
    dialog.show(
      'Dejar de editar',
      '¿Estás seguro/a que deseas continuar? Los cambios que no hayan sido guardados seran descartados.',
      () => setEditMode(false),
      {
        confirmText: 'Sí, descartar cambios',
        finalFocusRef: editModeRef,
      }
    );
  };

  const onEditSuccess = (r: Routine) => {
    setRoutine(r);
    setSegments(RoutineUtils.initializeSegments(r.segments));
    setSuccessMessage('Se han guardado los cambios');
    setEditMode(false);
  };

  useEffect(() => {
    if (!id || !Number(id)) {
      setLoading(false);
      return;
    }
    retrieveRoutine(Number(id));
  }, [id]);
  if (!loading && !routine) return <NotFound />;
  return (
    <ResponsiveCard defaultHeight='600px' position='relative'>
      <SkeletonWrapper loading={loading} heights={['60px', '90px', '60px']} height='70px' repeat={7} marginY={1}>
        <Flex justifyContent='space-between' mb={3} alignItems='center'>
          <LinkButton to={BRoutes.ROUTINES} leftIcon={<ArrowBackIcon />} size={['sm', 'md']}>
            Volver al listado
          </LinkButton>
          <Tooltip hasArrow label={editMode ? 'Salir de modo de edición' : 'Cambiar a modo de edición'}>
            <Button
              aria-label={editMode ? 'Salir de modo de edición' : 'Cambiar a modo de edición'}
              colorScheme='primary'
              size={['sm', 'md']}
              onClick={toggleEditMode}
              ref={editModeRef}
            >
              <Flex gap={2}>
                {editMode ? <EditOffIcon /> : <EditIcon />}
                <Text display={['none', 'inline']}>{editMode ? 'Dejar de editar' : 'Editar'}</Text>
              </Flex>
            </Button>
          </Tooltip>
          {dialog.render()}
        </Flex>
        <BAlert status='success' description={successMessage} autoFocus closable onClose={() => setSuccessMessage('')} />
        {routine && !editMode && <RoutineDetailsContent routine={routine} segments={segments} onSegmentsChange={() => setSegments} />}
        {routine && editMode && <RoutineEditForm routine={routine} segments={segments} onSuccess={onEditSuccess} />}
      </SkeletonWrapper>
    </ResponsiveCard>
  );
};

interface RoutineDetailsContentProps {
  routine: Routine;
  segments: DraggableSegment[];
  onSegmentsChange: (func: (segments: DraggableSegment[]) => DraggableSegment[]) => void;
}

export const RoutineDetailLabel = ({ children, ...props }: FormLabelProps) => (
  <FormLabel fontWeight='semibold' marginTop={3} color='text.300' _dark={{ color: 'primary.200' }} {...props}>
    {children}
  </FormLabel>
);

const RoutineDetailsContent = ({ routine, segments }: RoutineDetailsContentProps) => (
  <Flex direction='column'>
    <FormControl>
      <RoutineDetailLabel htmlFor='routine-name' mb={0}>
        Nombre
      </RoutineDetailLabel>
      <Heading aria-label='Routine Name'>{routine.name}</Heading>
    </FormControl>

    {routine.description && (
      <FormControl>
        <RoutineDetailLabel htmlFor='routine-description' mb={0}>
          Descripción
        </RoutineDetailLabel>
        <Heading size='md' as='h2' paddingY={2}>
          {routine.description}
        </Heading>
      </FormControl>
    )}
    <Box position='relative' marginTop={2}>
      <RoutineDetailLabel marginBottom={3} marginTop={0}>
        Planificación
      </RoutineDetailLabel>
      {!!segments?.length ? (
        <Box background='bg.400' borderRadius='lg' mb={5} maxHeight='400px' overflowY='auto'>
          <RoutineSegmentList displayOnly={true} segments={segments} onChange={() => {}} onRemove={() => {}} onEdit={() => {}} />
        </Box>
      ) : <Text><InfoIcon aria-hidden mr={2}/>Esta rutina no posee ningún segmento</Text>}
    </Box>
  </Flex>
);

const NotFound = () => (
  <ResponsiveCard>
    <Alert display='flex' gap={3} flexGrow={1} flexDirection='column' alignItems='center' justifyContent='center' background='transparent'>
      <Image src={missingIllustration} aria-hidden width={150} className='hue-adaptative' />
      <Text fontSize='lg' maxWidth={350} textAlign='center'>
        Lo sentimos, no hemos podido encontrar la rutina solicitada.
      </Text>
      <LinkButton to={BRoutes.ROUTINES} leftIcon={<ArrowBackIcon />}>
        Volver al listado
      </LinkButton>
    </Alert>
  </ResponsiveCard>
);

export default RoutineDetails;
