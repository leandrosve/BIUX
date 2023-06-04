import { ArrowBackIcon, DragHandleIcon, InfoIcon, PlusSquareIcon, UpDownIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Icon, List, ListItem, Text, Tooltip, VisuallyHidden } from '@chakra-ui/react';
import RoutineSegmentListItem, { RoutineSegment } from './RoutineSegmentListItem';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import RoutineSegmentForm from './RoutineSegmentForm';

/*const segmentsMock: RoutineSegment[] = [
  { id: 'a', distance: 110, cadence: 80, pulseRate: 120, duration: 60, description: "parado pedales a ritmo rp2' sentado" },
  {
    id: 'b',
    distance: 120,
    cadence: 70,
    pulseRate: 110,
    duration: 30,
    description: "3x6 Sprint 200mts rp1' , pausa 10' (1 serie 53x15) (2 serie 53x14) (3 serie 53x13)",
  },
  { id: 'c', distance: 90, cadence: 40, pulseRate: 115, duration: 20 },
];*/

const reorderItem = (items: RoutineSegment[], previousIndex: number, newIndex: number) => {
  const next = [...items];
  const el = next.splice(previousIndex, 1)[0];
  next.splice(newIndex, 0, el);
  return next;
};

const RoutineFormSegmentsStep = (props: { onPrevious: () => void }) => {
  const [segments, setSegments] = useState<RoutineSegment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [edittingSegment, setEdittingSegment] = useState<RoutineSegment | null>();

  // For drag and drop we need to pass an id to each segment
  const [localId, setLocalId] = useState(1);

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
    setSegments((prev) => [...prev, { ...segment, id: 'localId-' + localId }]);
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
        onCancel={() => setShowForm(false)}
        onSubmit={handleAddSegment}
        segment={edittingSegment}
        index={segments.length + 1}
      />
      <Flex justifyContent='space-between' mt={5} padding={2}>
        <Button variant='ghost' leftIcon={<ArrowBackIcon />} onClick={props.onPrevious}>
          Atrás
        </Button>
        <Button colorScheme='primary' type='submit' onClick={() => setShowForm(true)} isDisabled={!segments.length}>
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
          <Tooltip placement='right' hasArrow label='Cambiar metodo de ordenamiento (arrastrar/botones)' aria-label='A tooltip' openDelay={300}>
            <Button size='sm' onClick={() => setOrderMethod((prev) => (prev === 'drag' ? 'buttons' : 'drag'))} variant='ghost'>
              <Flex gap={2}>
                <Icon as={orderMethod === 'buttons' ? UpDownIcon : DragHandleIcon} />
                <VisuallyHidden>Cambiar metodo de ordenamiento (arrastrar/botones)</VisuallyHidden>
                <Icon as={InfoIcon} />
              </Flex>
            </Button>
          </Tooltip>
        )}
      </Flex>

      <Droppable droppableId='routine-items'>
        {(ul) => (
          <List className='routine-items' {...ul.droppableProps} ref={ul.innerRef}>
            {segments.map((s, i) => (
              <Draggable key={s.id} draggableId={s.id} index={i}>
                {(li) => {
                  return (
                    <ListItem key={s.id} ref={li.innerRef} {...li.draggableProps} tabIndex={0}>
                      <RoutineSegmentListItem
                        segment={s}
                        index={i}
                        lastElement={i + 1 === segments.length}
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

/* Minor components */

export default RoutineFormSegmentsStep;
