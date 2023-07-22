import { Box, Flex, Icon, IconProps, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SVGProps, useMemo } from 'react';
import ChakraUtils from '../../utils/ChakraUtils';
import { trainingResultData, routineSegmentsData } from './trainingMockData';
import { DistanceIcon, FootIcon, HeartIcon } from '../../components/common/Icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const RoutineTrainingChart = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg='bg.300' width={800} maxWidth={'100vw'}>
        <ModalHeader pb={0}>Resultados del entrenamiento</ModalHeader>
        <ModalCloseButton />
        <ModalBody pt={0} overflowX='auto'>
          <Example />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

interface Item {
  dataKey: 'duration' | 'distance' | 'pulseRate' | 'cadence';
  description: string;
  decorate: (value?: number) => string;
  color: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}
const items: Item[] = [
  {
    description: 'Distancia',
    decorate: (value?: number) => `${value} km`,
    color: 'orange',
    dataKey: 'distance',
    icon: DistanceIcon,
  },
  {
    description: 'Frecuencia Cardíaca',
    color: 'pink',
    decorate: (value?: number) => `${value} BPM`,
    dataKey: 'pulseRate',
    icon: HeartIcon,
  },
  {
    description: 'Cadencia',
    color: 'teal',
    decorate: (value?: number) => `${value} RPM`,
    dataKey: 'cadence',
    icon: FootIcon,
  },
];

type SegmentValueCategory = 'duration' | 'distance' | 'pulseRate' | 'cadence';
const Example = () => {
  const separateData = useMemo(() => {
    const categories: SegmentValueCategory[] = ['duration', 'distance', 'pulseRate', 'cadence'];
    let absoluteDurations: number[] = [];
    let totalDuration = 0;
    for (const data of trainingResultData) {
      totalDuration += data.duration;
      absoluteDurations.push(totalDuration);
    }
    const result: Record<SegmentValueCategory, { actual: number; expected: number }[]> = { duration: [], distance: [], pulseRate: [], cadence: [] };
    for (const category of categories) {
      result[category] = trainingResultData.map((i, index) => ({
        actual: i[category],
        duration: absoluteDurations[index],
        expected: routineSegmentsData[index][category],
      }));
    }
    return result;
  }, [trainingResultData]);
  return (
    <Box>
      {items.map((item) => (
        <Flex key={item.dataKey} position='relative' py={2} direction='column'>
          <Text as='span' m={0} marginTop={'-8px'}>
            {item.description}
          </Text>
          <ResponsiveContainer minWidth='400px' width='100%' height='100%' minHeight={80}>
            <LineChart data={separateData[item.dataKey]}  style={{overflow:'visible'}}>
              <Flex position='absolute' top={0}>
                tesst
              </Flex>
              <CartesianGrid strokeDasharray='3 3' />
              {item.dataKey == 'cadence' && ( //last item
                <XAxis
                  dataKey='duration'
                  tick={{ fill: 'var(--text-300)', fontFamily: 'var(--font-family)', fontSize: 'small' }}
                  tickFormatter={(v) => {
                    return v + "'";
                  }}
                />
              )}

              <YAxis padding={{top:0, bottom:0}} width={45}/>
              <Tooltip
                content={({ payload }) => (
                  <Box background='bg.400' padding={2} borderRadius='lg' borderWidth='1px'>
                    <Text color={`${item.color}.700`} fontSize='sm' _dark={{ color: `${item.color}.200` }}>
                      <Text as='span' display='inline-flex' alignItems='center' gap={1}>
                        <Icon as={item.icon} /> {item.description}
                      </Text>{' '}
                      <br />
                      <b>Resultado real: {item.decorate(payload?.[1]?.value as number)}</b>
                      <br />
                      {`Resultado esperado: ${item.decorate(payload?.[0]?.value as number)}`}
                    </Text>
                  </Box>
                )}
              />
              <Line
                type='natural'
                dataKey='expected'
                stroke={ChakraUtils.getColorVariable(item.color + '.200')}
                strokeWidth='2px'
                activeDot={{ r: 13 }}
              />

              <Line
                type='natural'
                dataKey='actual'
                stroke={ChakraUtils.getColorVariable(item.color + '.400')}
                strokeWidth='4px'
                activeDot={{ r: 13 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Flex>
      ))}
    </Box>
  );
};

export default RoutineTrainingChart;
