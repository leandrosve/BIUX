import { ArrowDownIcon, ArrowUpDownIcon, ChatIcon, DragHandleIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  FlexProps,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Tag,
  Text,
  Tooltip,
  background,
  useMediaQuery,
} from '@chakra-ui/react';
import { DistanceIcon, FootIcon, HeartIcon, StopwatchIcon } from '../../components/common/Icons';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';

const items = [
  {
    icon: StopwatchIcon,
    label: '',
    description: 'Duración en minutos',
    decorate: (value: number) => `${value} min`,
    colorScheme: 'blue',
    key: 'duration',
    accesor: (s: RoutineSegment) => s.duration,
  },
  {
    icon: DistanceIcon,
    label: '',
    description: 'Distancia (metros)',
    decorate: (value: number) => `${value} m`,
    colorScheme: 'orange',
    key: 'metres',
    accesor: (s: RoutineSegment) => s.distance,
  },
  {
    label: 'FC',
    description: 'Frecuencia Cardíaca',
    colorScheme: 'pink',
    key: 'fc',
    accesor: (s: RoutineSegment) => s.fc,
  },
  {
    label: 'CAD',
    description: 'Cadencia',
    colorScheme: 'teal',
    key: 'cad',
    accesor: (s: RoutineSegment) => s.cad,
  },
];

export interface RoutineSegment {
  distance: number;
  cad: number;
  fc: number;
  duration: number;
  extra?: string;
  id: string;
}

interface Props extends FlexProps {
  segment: RoutineSegment;
  index: number;
  onOrderChange: (previousIndex: number, newIndex: number) => void;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  lastElement?: boolean;
}

const RoutineSegmentListItem = ({ index, segment, onOrderChange, dragHandleProps, lastElement }: Props) => {
  const [mobile] = useMediaQuery('(max-width: 992px)', { ssr: false, fallback: true });
  const allowDragAndDrop = true;
  return (
    <Flex gap={2} alignItems='center' padding={2} background={'bg.300'} borderRadius='sm' borderBottom='1px solid' borderColor='chakra-border-color'>
      <Tooltip hasArrow label={`Orden de segmento: ${index + 1}`} aria-label='A tooltip' openDelay={600}>
        <Tag
          flexShrink={0}
          color='text.500'
          variant='outline'
          gap={2}
          padding={2}
          borderRadius='full'
          boxSize='30px'
          alignItems='center'
          justifyContent='center'
        >
          <Text fontSize='lg'>{index + 1}</Text>
        </Tag>
      </Tooltip>
      <Flex direction='column' gap={1} grow={1}>
        {segment.extra && (
          <div>
            <Tag gap={2} borderRadius='lg' boxShadow='sm' maxWidth='400px'>
              <Icon as={ChatIcon} boxSize={3} />
              <Text fontSize='sm' noOfLines={1}>
                {segment.extra}
              </Text>
            </Tag>
          </div>
        )}
        <Grid templateColumns={mobile ? 'repeat(2, 2fr)' : 'repeat(4, 1fr)'} gap={2}>
          {items.map((item) => {
            const decorate = item.decorate ?? ((v: number) => v);
            return (
              <GridItem key={item.key}>
                <Tooltip hasArrow label={item.description} aria-label='A tooltip' openDelay={600}>
                  <Tag colorScheme={item.colorScheme} gap={2} padding={1} borderRadius='lg' boxShadow='sm'>
                    <Flex direction={'column'} alignItems='center' justifyContent='center' minWidth='90px'>
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
      <Tooltip hasArrow label='Editar segmento' aria-label='A tooltip' openDelay={600}>
        <IconButton icon={<EditIcon />} aria-label='Editar segmento' />
      </Tooltip>

      {!allowDragAndDrop && (
        <ButtonGroup isAttached>
          <Tooltip hasArrow label='Mover arriba' aria-label='A tooltip' openDelay={300}>
            <IconButton
              variant='ghost'
              isDisabled={!index}
              onClick={() => onOrderChange(index, index - 1)}
              minWidth='25px'
              icon={<ArrowDownIcon transform='rotate(180deg)' />}
              aria-label='Mover arriba'
            />
          </Tooltip>
          <Tooltip hasArrow label='Mover abajo' aria-label='A tooltip' openDelay={300}>
            <IconButton
              variant='ghost'
              onClick={() => onOrderChange(index, index + 1)}
              minWidth='25px'
              icon={<ArrowDownIcon />}
              aria-label='Mover abajo'
              isDisabled={lastElement}
            />
          </Tooltip>
        </ButtonGroup>
      )}
      {allowDragAndDrop && (
        <Tooltip hasArrow label='Arrastra y suelta para ordenar' aria-label='A tooltip' placement='right' openDelay={1000}>
          <IconButton
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

export default RoutineSegmentListItem;
