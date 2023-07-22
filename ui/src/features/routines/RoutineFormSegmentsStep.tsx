import { ArrowBackIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import RoutineSegmentForm from './RoutineSegmentForm';
import Routine, { DraggableSegment, RoutineSegment } from '../../model/routines/Routine';
import AlertToast from '../../components/common/alert-toast/AlertToast';
import RoutineSegmentList from './RoutineSegmentList';
import RoutineUtils from '../../utils/RoutineUtils';
import { useNavigate } from 'react-router-dom';
import { BRoutes } from '../../router/routes';
import InstructorService from '../../services/api/InstructorService';
import { InstructorRoutinesContext } from '../../context/ListsProviders';

interface Props {
  routine: Routine;
  onPrevious: (segments: RoutineSegment[]) => void; // So we don't lose that info
  displayOnly?: boolean;
  editMode?: boolean;
}

const RoutineFormSegmentsStep = ({ routine, onPrevious, displayOnly, editMode }: Props) => {
  const [segments, setSegments] = useState<DraggableSegment[]>(RoutineUtils.initializeSegments(routine.segments));
  const [showForm, setShowForm] = useState(false);
  const [edittingSegment, setEdittingSegment] = useState<DraggableSegment | null>();
  const { onUpdate } = useContext(InstructorRoutinesContext);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleAddSegment = (segment: DraggableSegment) => {
    if (segment.localId) {
      handleEditSegment({ ...segment });
      return;
    }
    setSegments((prev) => {
      return [...prev, { ...segment, localId: RoutineUtils.getRandomLocalId(), order: prev.length + 1 }];
    });
    setShowForm(false);
  };

  const handleEditSegment = (segment: DraggableSegment) => {
    setSegments((prev) => prev.map((s) => (s.localId !== segment.localId ? s : segment)));
    setShowForm(false);
    setEdittingSegment(null);
  };

  const handleRemoveSegment = (segment: DraggableSegment) => {
    console.log("WTF");
    setSegments((prev) => RoutineUtils.removeAndReorderItems(prev, segment));
  };

  const handleOpenEditSegment = (segment: DraggableSegment) => {
    setEdittingSegment(segment);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const studentIds = routine.students.map(s => s.id);
    const res = await InstructorService.createRoutine({ ...routine, segments, students: studentIds });
    setIsSubmitting(false);
    if (res.hasError) return;
    onUpdate(RoutineUtils.toReducedRoutine(res.data));
    toast({
      position: 'top-right',
      duration: 15000,
      render: (t) => (
        <AlertToast colorScheme='primary' status='success' hasProgress duration={15000} hasIcon isClosable onClose={() => toast.close(t.id || '')}>
          {'Se ha creado la rutina exitosamente'}
        </AlertToast>
      ),
    });
    navigate(`${BRoutes.ROUTINES}/${res.data.id}`);
  };

  return (
    <Flex direction='column' grow={1} position='relative'>
      <Heading size='md' as='h2' color='text.300'>
        Planificación
      </Heading>

      <Flex gap='10px' direction='column' alignItems='stretch' grow={1} mt={3}>
        <RoutineSegmentList onChange={(v) => setSegments(v)} onEdit={handleOpenEditSegment} onRemove={handleRemoveSegment} segments={segments} />
        {!displayOnly && (
          <Flex
            grow={1}
            borderStyle='solid'
            borderWidth={!segments.length ? 1 : 0}
            borderColor='chakra-border-color'
            padding={5}
            borderRadius='lg'
            alignItems='center'
            justifyContent='center'
            direction='column'
            gap={3}
            fontWeight='bold'
          >
            {!segments.length && (
              <Text textAlign='center' maxWidth={330} color='text.300'>
                Aún no hay segmentos añadidos a esta rutina, comienza por agregar uno!
              </Text>
            )}
            <Button leftIcon={<PlusSquareIcon />} flexGrow={0} onClick={() => setShowForm(true)}>
              Agregar Segmento
            </Button>
          </Flex>
        )}
      </Flex>

      <RoutineSegmentForm
        isOpen={showForm}
        onCancel={() => {
          setShowForm(false);
          setEdittingSegment(null);
        }}
        onSubmit={handleAddSegment}
        segment={edittingSegment}
        index={edittingSegment ? segments.findIndex((i) => i.id == edittingSegment.id) + 1 : segments.length + 1}
      />
      {!displayOnly && (
        <Flex justifyContent={editMode ? 'end' : 'space-between'} mt={5} padding={2}>
          {!editMode && (
            <Button variant='ghost' leftIcon={<ArrowBackIcon />} onClick={() => onPrevious(segments)}>
              Atrás
            </Button>
          )}
          <Button colorScheme='primary' type='submit' onClick={handleSubmit} isLoading={isSubmitting} isDisabled={!segments.length}>
            Guardar
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default RoutineFormSegmentsStep;
