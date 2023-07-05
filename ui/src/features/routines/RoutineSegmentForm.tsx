import {
  Box,
  Button,
  CloseButton,
  Fade,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputFieldProps,
  NumberInputStepper,
  Slide,
  Tag,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DraggableSegment } from '../../model/routines/Routine';

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (segment: DraggableSegment) => void;
  index?: number;
  segment?: DraggableSegment | null; // For editting
  padding?: number | string;
}

const RoutineSegmentForm = (props: Props) => {
  return (
    <Fade
      in={props.isOpen}
      style={{ position: 'absolute', pointerEvents: 'none', bottom: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 1 }}
    >
      {props.isOpen && <Box pointerEvents='all' height='100%' width='100%' position='absolute' bottom={0} zIndex={2} onClick={props.onCancel} />}
      <Slide in={props.isOpen} unmountOnExit style={{ position: 'absolute', maxHeight: '84%', zIndex: 3, padding: props.padding }} direction='bottom'>
        <RoutineSegmentFormContent {...props} />
      </Slide>
    </Fade>
  );
};

const RoutineSegmentFormContent = ({ onCancel, onSubmit, index, segment }: Props) => {
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState<number>();
  const [distance, setDistance] = useState<number>();
  const [cadence, setCadence] = useState<number>();
  const [pulseRate, setPulseRate] = useState<number>();

  const ref = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const z = (value?: number) => value ?? 0;
    onSubmit({
      id: segment?.id,
      localId: segment?.localId ?? '',
      distance,
      order: segment?.order ?? -1,
      duration: z(duration),
      cadence: z(cadence),
      pulseRate: z(pulseRate),
      description,
    });
  };

  const disableSubmit = useMemo(() => {
    if (description.length > 120) return true;
    return [duration, cadence, pulseRate].some((v) => v !== 0 && !v);
  }, [description, duration, cadence, pulseRate]);

  useEffect(() => {
    if (!segment) return;
    setDescription(segment.description ?? '');
    setDuration(segment.duration);
    setDistance(segment.distance);
    setCadence(segment.cadence);
    setPulseRate(segment.pulseRate);
  }, [segment]);

  useEffect(() => {
    // Otherwise the UI tiembla como un flan no se por que
    setTimeout(() => ref?.current?.focus(), 300);
  }, []);

  return (
    <Box
      background='bg.400'
      padding={5}
      paddingBottom={0}
      borderRadius='lg'
      borderBottomRadius={0}
      border='1px solid'
      borderBottom='none'
      borderColor='chakra-border-color'
      width='100%'
      height='100%'
      pointerEvents='all'
      position='relative'
      overflowY='auto'
      bgGradient='linear(to-b, bg.400, bg.300)'
      tabIndex={-1}
      ref={ref}
    >
      <CloseButton position='absolute' top={3} right={5} onClick={onCancel} />
      <Box as='form' onSubmit={handleSubmit}>
        <Heading size='md' as='h3'>
          {index && (
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
              marginRight={2}
            >
              <Text fontSize='lg'>{index}</Text>
            </Tag>
          )}
          {segment ? 'Editar' : 'Nuevo'} Segmento
        </Heading>
        <Text fontSize='sm'>
          Los campos marcados con <b>*</b> son requeridos
        </Text>
        <FormControl isInvalid={description.length > 120}>
          <FormLabel mt={2} fontSize='sm'>
            Descripción breve
          </FormLabel>
          <Input value={description} placeholder='Descripción breve' onChange={(e) => setDescription(e.target.value)} />
          {description.length > 120 && <FormErrorMessage>La cantidad máxima de caracteres es 120</FormErrorMessage>}
        </FormControl>
        <Grid templateColumns='repeat(2, 2fr)' gap={2} marginTop={2}>
          <Tag colorScheme='blue' padding={2}>
            <FormControl>
              <FormLabel mt={2} fontSize='sm' marginTop={0}>
                Duracion{' '}
                <Text fontSize='xs' as='span'>
                  (minutos){' '}
                </Text>
                <b>*</b>
              </FormLabel>
              <BasicNumberInput value={duration} placeholder='Duración' max={320} onChange={(v) => setDuration(v)} />
            </FormControl>
          </Tag>
          <Tag colorScheme='orange' padding={2}>
            <FormControl>
              <FormLabel mt={2} fontSize='sm' marginTop={0}>
                Distancia{' '}
                <Text fontSize='xs' as='span'>
                  (metros)
                </Text>
              </FormLabel>
              <BasicNumberInput value={distance} max={100000} placeholder='Distancia' onChange={(v) => setDistance(v)} />
            </FormControl>
          </Tag>
          <Tag colorScheme='pink' padding={2}>
            <FormControl>
              <FormLabel mt={2} fontSize='sm' marginTop={0}>
                Cadencia <b>*</b>
              </FormLabel>
              <BasicNumberInput value={cadence} placeholder='Cadencia' max={250} onChange={(v) => setCadence(v)} />
            </FormControl>
          </Tag>
          <Tag colorScheme='teal' padding={2}>
            <FormControl>
              <FormLabel mt={2} fontSize='sm' marginTop={0}>
                Frecuencia Cardíaca <b>*</b>
              </FormLabel>
              <BasicNumberInput value={pulseRate} placeholder='Frec. Cardíaca' max={250} onChange={(v) => setPulseRate(v)} />
            </FormControl>
          </Tag>
        </Grid>
        <Flex paddingY={3} justifyContent='space-between'>
          <Button onClick={onCancel}>Cancelar</Button>
          <Tooltip
            placement='left'
            hasArrow
            isDisabled={!disableSubmit}
            label='Completa los campos necesarios'
            aria-label='A tooltip'
            openDelay={300}
          >
            <Button type='submit' colorScheme='primary' isDisabled={disableSubmit}>
              Aceptar
            </Button>
          </Tooltip>
        </Flex>
      </Box>
    </Box>
  );
};

interface BasicNumberInputProps extends Omit<NumberInputFieldProps, 'onChange'> {
  max?: number;
  value?: 'string' | number;
  onChange: (value?: number) => void;
}
const BasicNumberInput = ({ max, value, onChange, ...rest }: BasicNumberInputProps) => {
  const handleChange = (value: string) => {
    const number = parseInt(value);
    if (number !== 0 && !number) onChange(undefined);
    if (isNaN(number)) return;
    onChange(number);
  };
  return (
    <NumberInput size='sm' min={0} max={max} value={`${value ?? ''}`} _light={{ border: '0px solid' }} onChange={handleChange}>
      <NumberInputField {...rest} min={0} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default RoutineSegmentForm;
