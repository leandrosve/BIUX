import { useState, useMemo, useContext } from 'react';
import Routine, { DraggableSegment, ReducedRoutine } from '../../model/routines/Routine';
import { Box, Button, Collapse, Flex, FormControl, FormErrorMessage, Input, Text, Tooltip } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import RoutineSegmentList from './RoutineSegmentList';
import RoutineUtils from '../../utils/RoutineUtils';
import RoutineSegmentForm from './RoutineSegmentForm';
import { RoutineDetailLabel } from './RoutineDetails';
import BAlert from '../../components/common/BAlert';
import InstructorService from '../../services/api/InstructorService';
import { InstructorRoutinesContext } from '../../context/ListsProviders';

interface RoutineEditProps {
  routine: Routine;
  segments: DraggableSegment[];
  onSuccess: (routine: Routine) => void;
}
const RoutineEditForm = ({ routine, segments, onSuccess }: RoutineEditProps) => {
  const [newSegments, setNewSegments] = useState<DraggableSegment[]>(segments);
  const [name, setName] = useState(routine.name);
  const [description, setDescription] = useState(routine.description);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [edittingSegment, setEdittingSegment] = useState<DraggableSegment | null>();

  const { onUpdate } = useContext(InstructorRoutinesContext);

  const fieldErrors = useMemo(() => {
    let submit = !name ? 'Por favor completa los campos obligatorios' : '';
    if (!submit) submit = !newSegments?.length ? 'Debes agregar al menos un segmento' : '';
    return {
      name: !name ? 'Este campo es obligatorio' : '',
      submit,
    };
  }, [name, newSegments]);

  const handleAddSegment = (segment: DraggableSegment) => {
    if (segment.localId) {
      setNewSegments((prev) => prev.map((s) => (s.localId !== segment.localId ? s : segment)));
    } else {
      setNewSegments((prev) => [...prev, { ...segment, localId: RoutineUtils.getRandomLocalId(), order: prev.length + 1 }]);
    }
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!routine.id) return;
    const data = { ...routine, name, description, segments: newSegments };
    setIsSubmitting(true);
    const res = await InstructorService.editRoutine(routine.id, data);
    if (res.hasError) {
      setIsSubmitting(false);
      setError('Lo sentimos, ha ocurrido un error al tratar de actualizar la rutina.');
      return;
    }
    onSuccess(res.data);
    onUpdate(RoutineUtils.toReducedRoutine(res.data));
  };

  return (
    <>
      <Flex as='form' direction='column' flexGrow={1} onSubmit={handleSubmit}>
        <BAlert status='error' description={error} autoFocus />
        <FormControl isInvalid={!!fieldErrors.name}>
          <RoutineDetailLabel htmlFor='routine-name'>Nombre *</RoutineDetailLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} autoFocus placeholder='Nombre' id='routine-name' fontWeight='bold' />
          <FormErrorMessage _light={{ color: 'red.600' }}>{fieldErrors.name}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <RoutineDetailLabel htmlFor='routine-description'>Descripción</RoutineDetailLabel>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Descripción'
            fontWeight='bold'
            id='routine-description'
          />
        </FormControl>
        <Flex direction='column' grow={1} position='relative' marginTop={2}>
          <RoutineDetailLabel marginBottom={3} marginTop={0}>
            Planificación
          </RoutineDetailLabel>
          {!!newSegments?.length && (
            <Box background='bg.400' borderRadius='lg' mb={5} maxHeight='300px' overflowY='auto'>
              <RoutineSegmentList
                segments={newSegments}
                onChange={(v) => setNewSegments(v)}
                onRemove={(seg) => setNewSegments((prev) => prev.filter((s) => s.localId !== seg.localId))}
                onEdit={(s) => {
                  setShowForm(true);
                  setEdittingSegment(s);
                }}
              />
            </Box>
          )}
          <Flex justifyContent='center' alignItems='center' direction={{ base: 'column', md: 'row' }} gap={2} grow={1}>
            <Collapse in={!newSegments.length}>
              <Text maxWidth={330} color='text.300' textAlign={{ base: 'center', md: 'start' }}>
                Aún no hay segmentos añadidos a esta rutina, comienza por agregar uno!
              </Text>
            </Collapse>
            <Button leftIcon={<PlusSquareIcon />} flexGrow={0} onClick={() => setShowForm(true)}>
              Agregar Segmento
            </Button>
          </Flex>
        </Flex>

        <Flex mt={5} justifyContent='end'>
          <Tooltip hasArrow label={fieldErrors.submit} isDisabled={!fieldErrors.submit}>
            <Button colorScheme='primary' type='submit' isDisabled={!newSegments.length} isLoading={isSubmitting}>
              Guardar
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
      <RoutineSegmentForm
        isOpen={showForm}
        onCancel={() => {
          setShowForm(false);
          setEdittingSegment(null);
        }}
        padding='15px'
        onSubmit={handleAddSegment}
        segment={edittingSegment}
        index={edittingSegment ? segments.findIndex((i) => i.id == edittingSegment.id) + 1 : segments.length + 1}
      />
    </>
  );
};

export default RoutineEditForm;
