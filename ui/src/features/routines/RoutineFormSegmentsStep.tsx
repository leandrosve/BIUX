import { ArrowBackIcon, DragHandleIcon, InfoIcon, PlusSquareIcon, UpDownIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Icon, List, ListItem, Text, Tooltip, VisuallyHidden, useToast } from '@chakra-ui/react';
import RoutineSegmentListItem from './RoutineSegmentListItem';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import RoutineSegmentForm from './RoutineSegmentForm';
import BTooltip from '../../components/common/BTooltip';
import Routine, { DraggableSegment, RoutineSegment } from '../../model/routines/Routine';
import RoutineService from '../../services/api/RoutineService';
import AlertToast from '../../components/common/alert-toast/AlertToast';

interface Props {
  routine: Routine;
  onPrevious: (segments: RoutineSegment[]) => void; // So we don't lose that info
}

const RoutineFormSegmentsStep = ({ routine, onPrevious }: Props) => {
  const [segments, setSegments] = useState<DraggableSegment[]>(initializeSegments(routine.segments));
  const [showForm, setShowForm] = useState(false);
  const [edittingSegment, setEdittingSegment] = useState<DraggableSegment | null>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const toast = useToast();

  const handleOrderChange = (previousIndex: number, newIndex: number) => {
    setSegments((prev) => insertAndReorderItems(prev, previousIndex, newIndex));
  };

  const handleOnDragEnd = (result: DropResult) => {
    setSegments((prev) => {
      if (!result.destination) return prev;
      return insertAndReorderItems(prev, result.source.index, result.destination.index);
    });
  };

  const handleAddSegment = (segment: DraggableSegment) => {
    if (segment.id) {
      handleEditSegment({ ...segment });
      return;
    }
    setSegments((prev) => {
      return [...prev, { ...segment, localId: getRandomLocalId(), order: prev.length + 1 }];
    });
    setShowForm(false);
  };

  const handleEditSegment = (segment: DraggableSegment) => {
    setSegments((prev) => prev.map((s) => (s.id !== segment.id ? s : segment)));
    setShowForm(false);
    setEdittingSegment(null);
  };

  const handleRemoveSegment = (segment: DraggableSegment) => {
    setSegments((prev) => prev.filter((s) => s.id !== segment.id));
  };

  const handleOpenEditSegment = (segment: DraggableSegment) => {
    setEdittingSegment(segment);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const res = await RoutineService.createRoutine({ ...routine, segments });
    setIsSubmitting(false);
    if (res.hasError) return;
    toast({
      position: 'bottom-right',
      duration: 15000,
      render: (t) => (
        <AlertToast colorScheme='primary' status='success' hasProgress duration={15000} hasIcon isClosable onClose={() => toast.close(t.id || '')}>
          {'Se ha creado la rutina exitosamente'}
        </AlertToast>
      ),
    });
  };

  return (
    <Flex direction='column' grow={1}>
      <Heading size='md' as='h2' color='text.300'>
        Planificación
      </Heading>

      <Flex gap='10px' direction='column' alignItems='stretch' grow={1} mt={3}>
        <DraggableList
          onDragEnd={handleOnDragEnd}
          onOrderChange={handleOrderChange}
          onEdit={handleOpenEditSegment}
          onRemove={handleRemoveSegment}
          segments={segments}
        />
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
      <Flex justifyContent='space-between' mt={5} padding={2}>
        <Button variant='ghost' leftIcon={<ArrowBackIcon />} onClick={() => onPrevious(segments)}>
          Atrás
        </Button>
        <Button colorScheme='primary' type='submit' onClick={handleSubmit} isLoading={isSubmitting} isDisabled={!segments.length}>
          Guardar
        </Button>
      </Flex>
    </Flex>
  );
};

interface DraggableListProps {
  onDragEnd: (result: DropResult) => void;
  onOrderChange: (prev: number, next: number) => void;
  segments: DraggableSegment[];
  onRemove: (removedItem: DraggableSegment) => void;
  onEdit: (removedItem: DraggableSegment) => void;
}

const DraggableList = ({ onDragEnd, onOrderChange, onRemove, onEdit, segments }: DraggableListProps) => {
  const [orderMethod, setOrderMethod] = useState<'drag' | 'buttons'>('drag');
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex gap={2} alignItems='center' justifyContent='end' position='absolute' top='0px' right={2}>
        {!!segments.length && (
          <BTooltip placement='left' hasArrow label='Cambiar metodo de ordenamiento (arrastrar/botones)' aria-label='A tooltip' openDelay={300}>
            <Button size='sm' onClick={() => setOrderMethod((prev) => (prev === 'drag' ? 'buttons' : 'drag'))} variant='ghost'>
              <Flex gap={2}>
                <Icon as={orderMethod === 'buttons' ? UpDownIcon : DragHandleIcon} />
                <VisuallyHidden>Cambiar metodo de ordenamiento (arrastrar/botones)</VisuallyHidden>
                <Icon as={InfoIcon} />
              </Flex>
            </Button>
          </BTooltip>
        )}
      </Flex>

      <Droppable droppableId='routine-items'>
        {(ul) => (
          <List className='routine-items' {...ul.droppableProps} ref={ul.innerRef} maxHeight='50vh' overflowX='hidden' overflowY='auto'>
            {segments.map((s, i) => (
              <Draggable key={s.localId} draggableId={s.localId} index={i} isDragDisabled={orderMethod == 'buttons'}>
                {(li) => {
                  return (
                    <ListItem key={s.localId} ref={li.innerRef} {...li.draggableProps} tabIndex={0}>
                      <RoutineSegmentListItem
                        segment={s}
                        index={i}
                        lastIndex={segments.length - 1}
                        onOrderChange={onOrderChange}
                        dragHandleProps={li.dragHandleProps}
                        orderMethod={orderMethod}
                        onRemove={onRemove}
                        onEdit={onEdit}
                      />
                    </ListItem>
                  );
                }}
              </Draggable>
            ))}
            {ul.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

/* Utility functions */

const LOCAL_ID_PREFIX = 'localId-'; // prefix used to allow drag and drop
const getRandomLocalId = () => LOCAL_ID_PREFIX + crypto.randomUUID();
const sortSegments = (segments: RoutineSegment[]) => segments.sort((a, b) => (a.order > b.order ? 1 : -1));
const generateLocalIds = (segments: RoutineSegment[]) => segments.map((s) => ({ ...s, localId: `${s.id}` }));
const initializeSegments = (segments: RoutineSegment[]) => generateLocalIds(sortSegments(segments));

const insertAndReorderItems = (items: DraggableSegment[], previousIndex: number, newIndex: number) => {
  const orderedItems = [...items];
  const el = orderedItems.splice(previousIndex, 1)[0];
  orderedItems.splice(newIndex, 0, el);
  return orderedItems.map((item, index) => ({ ...item, order: index + 1 }));
};
export {DraggableList as RoutineSegmentsDraggableList };
export default RoutineFormSegmentsStep;
