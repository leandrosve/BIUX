import { ChatIcon, ChevronDownIcon, ChevronUpIcon, DeleteIcon, DragHandleIcon, EditIcon } from '@chakra-ui/icons';
import { Flex, FlexProps, Grid, GridItem, Icon, IconButton, Tag, TagLabel, TagProps, Text, Tooltip, useMediaQuery } from '@chakra-ui/react';
import { DistanceIcon, StopwatchIcon } from '../../components/common/Icons';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import { DraggableSegment, RoutineSegment } from '../../model/routines/Routine';
import { useEffect, useRef } from 'react';

const items = [
  {
    icon: StopwatchIcon,
    label: '',
    description: 'Duración en minutos',
    decorate: (value?: number) => `${value} min`,
    colorScheme: 'blue',
    key: 'duration',
    accesor: (s: RoutineSegment) => s.duration,
  },
  {
    icon: DistanceIcon,
    label: '',
    description: 'Distancia (metros)',
    decorate: (value?: number) => `${value} m`,
    colorScheme: 'orange',
    key: 'metres',
    accesor: (s: RoutineSegment) => s.distance,
  },
  {
    label: 'FC',
    description: 'Frecuencia Cardíaca',
    colorScheme: 'pink',
    key: 'fc',
    accesor: (s: RoutineSegment) => s.pulseRate,
  },
  {
    label: 'CAD',
    description: 'Cadencia',
    colorScheme: 'teal',
    key: 'cad',
    accesor: (s: RoutineSegment) => s.cadence,
  },
];

interface Props extends FlexProps {
  segment: DraggableSegment;
  index: number;
  onOrderChange: (previousIndex: number, newIndex: number) => void;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  lastIndex: number;
  orderMethod?: 'drag' | 'buttons';
  onRemove: (removedItem: DraggableSegment) => void;
  onEdit: (removedItem: DraggableSegment) => void;
  hideButtons?: boolean;
}

const RoutineSegmentListItem = ({
  index,
  segment,
  onOrderChange,
  onRemove,
  onEdit,
  dragHandleProps,
  lastIndex,
  orderMethod = 'drag',
  hideButtons,
}: Props) => {
  const [smallScreen, mobile ] = useMediaQuery(['(max-width: 700px)', '(max-width: 400px)'], { ssr: false, fallback: true });

  const sortUpRef = useRef<HTMLButtonElement>(null);
  const sortDownRef = useRef<HTMLButtonElement>(null);

  const handleOrderChange = (direction: 'up' | 'down') => {
    let ref = direction == 'up' ? sortUpRef : sortDownRef;
    // This is so the focus is not lost when re-ordering
    if (index + 1 >= lastIndex) ref = sortUpRef;
    else if (index == 1) ref = sortDownRef;
    onOrderChange(index, index + (direction == 'down' ? 1 : -1));
    setTimeout(() => ref?.current?.focus(), 100);
  };
  return (
    <Flex
      gap={2}
      alignItems='center'
      padding={2}
      borderRadius='sm'
      borderStyle='solid'
      borderBottomWidth={index >= lastIndex ? '0' : '1px'}
      borderColor='chakra-border-color'
    >
      {!mobile && <SegmentOrderTag index={segment.order} />}
      <Flex direction='column' gap={1} grow={1}>
        <Flex gap={3}>
          {mobile && <SegmentOrderTag index={segment.order} display='inline-flex' />}
          {segment.description && (
            <Tag gap={2} borderRadius='lg' boxShadow='sm' maxWidth='400px' aria-label='descripción' alignSelf='start' display='inline-flex'>
              <Icon as={ChatIcon} boxSize={3} />
              <Text fontSize='sm' noOfLines={1}>
                {segment.description}
              </Text>
            </Tag>
          )}
        </Flex>
        <Flex>
          <Grid templateColumns={smallScreen ? 'repeat(2, 2fr)' : 'repeat(4, 1fr)'} gap={2}>
            {items.map((item) => {
              const decorate = item.decorate ?? ((v?: number) => v);
              if (!item.accesor(segment)) return null;
              return (
                <GridItem key={item.key}>
                  <Tooltip hasArrow label={item.description} aria-label='A tooltip' openDelay={600}>
                    <Tag colorScheme={item.colorScheme} gap={2} padding={1} borderRadius='lg' boxShadow='sm'>
                      <Flex direction={'column'} alignItems='center' justifyContent='center' minWidth='85px'>
                        <Flex alignItems='center' gap='3px'>
                          {item.icon && <Icon as={item.icon} strokeWidth={5} />}
                          <Text display='flex' alignItems='center' gap={1}>
                            {item.label}
                          </Text>
                          <Text fontWeight='bold'>{decorate(item.accesor(segment))}</Text>
                        </Flex>
                      </Flex>
                    </Tag>
                  </Tooltip>
                </GridItem>
              );
            })}
          </Grid>
        </Flex>
      </Flex>
      <Flex
        alignItems='center'
        gap={2}
        justifyContent='center'
        direction={{ base: 'column-reverse', md: 'row' }}
        visibility={hideButtons ? 'hidden' : 'visible'}
      >
        <Tooltip hasArrow label='Eliminar segmento' aria-label='A tooltip' openDelay={600}>
          <IconButton icon={<DeleteIcon />} aria-label='Eliminar segmento' variant='ghost' colorScheme='red' onClick={() => onRemove(segment)} />
        </Tooltip>
        <Tooltip hasArrow label='Editar segmento' aria-label='A tooltip' openDelay={600}>
          <IconButton icon={<EditIcon />} aria-label='Editar segmento' onClick={() => onEdit(segment)} />
        </Tooltip>
      </Flex>

      {orderMethod == 'buttons' && (
        <Flex direction='column' visibility={hideButtons ? 'hidden' : 'visible'}>
          <Tooltip hasArrow label='Mover hacia arriba' aria-label='A tooltip' placement='left' openDelay={800}>
            <IconButton
              variant='ghost'
              ref={sortUpRef}
              isDisabled={!index}
              onClick={() => handleOrderChange('up')}
              icon={<ChevronUpIcon />}
              aria-label='Mover arriba'
              height='25px'
              borderBottomRadius={0}
            />
          </Tooltip>
          <Tooltip hasArrow label='Mover hacia abajo' aria-label='A tooltip' placement='left' openDelay={800}>
            <IconButton
              variant='ghost'
              ref={sortDownRef}
              onClick={() => handleOrderChange('down')}
              icon={<ChevronDownIcon />}
              aria-label='Mover abajo'
              height='25px'
              isDisabled={index >= lastIndex}
              borderTopRadius={0}
            />
          </Tooltip>
        </Flex>
      )}
      {orderMethod == 'drag' && (
        <Tooltip isDisabled={hideButtons} hasArrow label='Arrastra y suelta para ordenar' aria-label='A tooltip' placement='right' openDelay={1000}>
          <IconButton
            visibility={hideButtons ? 'hidden' : 'visible'}
            icon={<DragHandleIcon />}
            variant='ghost'
            aria-label='Cambiar orden del segmento'
            _hover={{ background: 'transparent' }}
            _active={{ background: 'transparent' }}
            {...dragHandleProps}
          />
        </Tooltip>
      )}
    </Flex>
  );
};

interface SegmentOrderTagProps extends TagProps {
  index: number;
}
const SegmentOrderTag = ({ index, ...props }: SegmentOrderTagProps) => {
  return (
    <Tooltip hasArrow label={`Orden de segmento: ${index}`} aria-label='A tooltip' openDelay={600}>
      <Tag
        flexShrink={0}
        color='text.500'
        variant='outline'
        gap={2}
        size='sm'
        padding={0}
        borderRadius='full'
        boxSize='30px'
        alignItems='center'
        justifyContent='center'
        aria-label='Orden del segmento'
        {...props}
      >
        {index}
      </Tag>
    </Tooltip>
  );
};

export default RoutineSegmentListItem;
