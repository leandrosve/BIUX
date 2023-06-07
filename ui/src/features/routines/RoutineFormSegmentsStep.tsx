import { ArrowBackIcon, DragHandleIcon, InfoIcon, PlusSquareIcon, UpDownIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Icon, List, ListItem, Text, Tooltip, VisuallyHidden } from '@chakra-ui/react';
import RoutineSegmentListItem from './RoutineSegmentListItem';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import RoutineSegmentForm from './RoutineSegmentForm';
import BTooltip from '../../components/common/BTooltip';
import Routine, { RoutineSegment } from '../../model/routines/Routine';
import RoutineService from '../../services/api/RoutineService';

interface Props {
  routine: Routine;
  onPrevious: (segments: RoutineSegment[]) => void; // So we don't lose that info
}

const RoutineFormSegmentsStep = ({ routine, onPrevious }: Props) => {
  const [segments, setSegments] = useState<RoutineSegment[]>(routine.segments);
  const [showForm, setShowForm] = useState(false);
  const [edittingSegment, setEdittingSegment] = useState<RoutineSegment | null>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // For drag and drop we need to pass an id to each segment
  const [localId, setLocalId] = useState(findLastLocalId(routine.segments));

  const handleOrderChange = (previousIndex: number, newIndex: number) => {
    setSegments((prev) => reorderItem(prev, previousIndex, newIndex));
  };

  const handleOnDragEnd = (result: DropResult) => {
    setSegments((prev) => {
      if (!result.destination) return prev;
      return reorderItem(prev, result.source.index, result.destination.index);
    });
  };

  const handleAddSegment = (segment: RoutineSegment) => {
    if (segment.id) {
      handleEditSegment(segment);
      return;
    }
    setSegments((prev) => {
      return [...prev, { ...segment, id: 'localId-' + localId }];
    });
    setLocalId((prev) => prev + 1);
    setShowForm(false);
  };

  const handleEditSegment = (segment: RoutineSegment) => {
    setSegments((prev) => prev.map((s) => (s.id !== segment.id ? s : segment)));
    setShowForm(false);
    setEdittingSegment(null);
  };

  const handleRemoveSegment = (segment: RoutineSegment) => {
    setSegments((prev) => prev.filter((s) => s.id !== segment.id));
  };

  const handleOpenEditSegment = (segment: RoutineSegment) => {
    setEdittingSegment(segment);
    setShowForm(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await RoutineService.createRoutine({ ...routine, segments });
    setIsSubmitting(false);
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
  segments: RoutineSegment[];
  onRemove: (removedItem: RoutineSegment) => void;
  onEdit: (removedItem: RoutineSegment) => void;
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
          <List className='routine-items' {...ul.droppableProps} ref={ul.innerRef} maxHeight='60%' overflowX='hidden' overflowY='auto'>
            {segments.map((s, i) => (
              <Draggable key={s.id} draggableId={s.id} index={i} isDragDisabled={orderMethod == 'buttons'}>
                {(li) => {
                  return (
                    <ListItem key={s.id} ref={li.innerRef} {...li.draggableProps} tabIndex={0}>
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

const reorderItem = (items: RoutineSegment[], previousIndex: number, newIndex: number) => {
  const next = [...items];
  const el = next.splice(previousIndex, 1)[0];
  next.splice(newIndex, 0, el);
  return next;
};

const findLastLocalId = (items: RoutineSegment[]) => {
  let maxId = 0;
  for (let item of items) {
    if (!item.id.startsWith('localId-')) continue;
    const id = parseInt(item.id.split('-')[1]);
    if (id > maxId) maxId = id;
  }
  return maxId + 1;
};

export default RoutineFormSegmentsStep;
