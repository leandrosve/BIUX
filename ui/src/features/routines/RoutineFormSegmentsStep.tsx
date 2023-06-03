import { ArrowBackIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    List,
    ListItem,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputFieldProps,
    NumberInputStepper
} from '@chakra-ui/react';
import RoutineSegmentListItem, { RoutineSegment } from './RoutineSegmentListItem';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
const segmentsMock = [
  { id: 'a', distance: 110, cad: 80, fc: 120, duration: 60, extra: "parado pedales a ritmo rp2' sentado" },
  {
    id: 'b',
    distance: 120,
    cad: 70,
    fc: 110,
    duration: 30,
    extra: "3x6 Sprint 200mts rp1' , pausa 10' (1 serie 53x15) (2 serie 53x14) (3 serie 53x13)",
  },
  { id: 'c', distance: 90, cad: 40, fc: 115, duration: 20 },
];

const RoutineFormSegmentsStep = (props: { onPrevious: () => void }) => {
  const [segments, setSegments] = useState<RoutineSegment[]>(segmentsMock);
  const [showForm, setShowForm] = useState(false);
  const handleOrderChange = (previousIndex: number, newIndex: number) => {
    setSegments((prev) => {
      const next = [...prev];
      const el = next.splice(previousIndex, 1)[0];
      next.splice(newIndex, 0, el);
      return next;
    });
  };

  function handleOnDragEnd(result: DropResult) {
    setSegments((prev) => {
      if (!result.destination) return prev;
      const items = Array.from(prev);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination?.index, 0, reorderedItem);
      return items;
    });
  }

  return (
    <Box>
      <Box>
        <Heading size='md' as='h2' color='text.300'>
          Resultados Esperados
        </Heading>

        <Box gap='3px' position='relative'>
          <DraggableList onDragEnd={handleOnDragEnd} onOrderChange={handleOrderChange} segments={segments} />
        </Box>
        <Flex justifyContent='space-between' mt={5}>
          <Button variant='ghost' leftIcon={<ArrowBackIcon />} onClick={props.onPrevious}>
            Atrás
          </Button>
          <Button colorScheme='primary' type='submit' onClick={() => setShowForm(true)}>
            Guardar
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

interface DraggableListProps {
  onDragEnd: (result: DropResult) => void;
  onOrderChange: (prev: number, next: number) => void;
  segments: RoutineSegment[];
}
const DraggableList = ({ onDragEnd, onOrderChange, segments }: DraggableListProps) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId='routine-items'>
      {(ul) => (
        <List className='routine-items' {...ul.droppableProps} ref={ul.innerRef}>
          {segments.map((s, i) => (
            <Draggable key={s.id} draggableId={s.id} index={i}>
              {(li) => {
                return (
                  <ListItem key={s.id} ref={li.innerRef} {...li.draggableProps} {...li.dragHandleProps} tabIndex={0}>
                    <RoutineSegmentListItem
                      segment={s}
                      index={i}
                      lastElement={i + 1 === segments.length}
                      onOrderChange={onOrderChange}
                      dragHandleProps={li.dragHandleProps}
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

/* Minor components */

const RutineSegmentForm = () => {
  return (
    <Box>
      <Heading size='sm' as='h3'>
        Nuevo Segmento
      </Heading>
      <form>
        <Flex gap={2}>
          <FormControl width={160}>
            <FormLabel mt={2} fontWeight='bold' fontSize='sm'>
              Duracion (minutos)
            </FormLabel>
            <BasicNumberInput placeholder='Duración' />
          </FormControl>
          <FormControl width={120}>
            <FormLabel mt={2} fontWeight='bold' fontSize='sm'>
              Cadencia
            </FormLabel>
            <BasicNumberInput placeholder='Cadencia' />
          </FormControl>
          <FormControl width={120}>
            <FormLabel mt={2} fontWeight='bold' fontSize='sm'>
              Frec. Cardíaca
            </FormLabel>
            <BasicNumberInput placeholder='Frec. Cardíaca' />
          </FormControl>
        </Flex>
      </form>
    </Box>
  );
};

const BasicNumberInput = (props: NumberInputFieldProps) => (
  <NumberInput size='sm' min={0}>
    <NumberInputField {...props} min={0} />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
);

export default RoutineFormSegmentsStep;
