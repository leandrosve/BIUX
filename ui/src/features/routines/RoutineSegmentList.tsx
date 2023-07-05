import { DragHandleIcon, InfoIcon, UpDownIcon } from '@chakra-ui/icons';
import { Button, Divider, Flex, Icon, List, ListItem, VisuallyHidden } from '@chakra-ui/react';
import RoutineSegmentListItem from './RoutineSegmentListItem';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import BTooltip from '../../components/common/BTooltip';
import { DraggableSegment } from '../../model/routines/Routine';
import RoutineUtils from '../../utils/RoutineUtils';

interface Props {
  segments: DraggableSegment[];
  onRemove: (removedItem: DraggableSegment) => void;
  onEdit: (item: DraggableSegment) => void;
  displayOnly?: boolean;
  onChange: (func: (segments: DraggableSegment[]) => DraggableSegment[]) => void;
}

const RoutineSegmentList = ({ onRemove, onEdit, segments, displayOnly, onChange }: Props) => {
  const handleOrderChange = (previousIndex: number, newIndex: number) => {
    onChange((prev) => RoutineUtils.insertAndReorderItems(prev, previousIndex, newIndex));
  };

  const handleOnDragEnd = (result: DropResult) => {
    onChange((prev) => {
      if (!result.destination) return prev;
      return RoutineUtils.insertAndReorderItems(prev, result.source.index, result.destination.index);
    });
  };

  const [orderMethod, setOrderMethod] = useState<'drag' | 'buttons'>('drag');
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Flex gap={2} alignItems='center' justifyContent='end' position='absolute' top='0px' right={2}>
        {!displayOnly && !!segments.length && (
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
                    <>
                      <ListItem key={s.localId} ref={li.innerRef} {...li.draggableProps}>
                        <RoutineSegmentListItem
                          segment={s}
                          index={i}
                          lastIndex={segments.length - 1}
                          onOrderChange={handleOrderChange}
                          dragHandleProps={li.dragHandleProps}
                          orderMethod={orderMethod}
                          onRemove={onRemove}
                          onEdit={onEdit}
                          hideButtons={displayOnly}
                        />
                      </ListItem>
                    </>
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

export default RoutineSegmentList;
