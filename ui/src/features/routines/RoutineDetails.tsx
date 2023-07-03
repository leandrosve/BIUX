import Reac, { useState, useEffect } from 'react';
import ResponsiveCard from '../../components/common/ResponsiveCard';
import { useParams } from 'react-router-dom';
import Routine from '../../model/routines/Routine';
import { Alert, Flex, Heading, Image, Text } from '@chakra-ui/react';
import missingIllustration from '../../assets/illustrations/missing-page.png';
import LinkButton from '../../components/common/LinkButton';
import { BRoutes } from '../../router/routes';
import { ArrowBackIcon } from '@chakra-ui/icons';
import SkeletonWrapper from '../../components/common/SkeletonWrapper';
import RoutineService from '../../services/api/RoutineService';
import RoutineFormSegmentsStep, { RoutineSegmentsDraggableList } from './RoutineFormSegmentsStep';

const RoutineDetails = () => {
  let { id } = useParams();
  const [routine, setRoutine] = useState<Routine>();
  const [loading, setLoading] = useState(true);

  const retrieveRoutine = async (id: number) => {
    const res = await RoutineService.getRoutineDetail(id);
    if (res.hasError) {
      setLoading(false);
      return;
    }
    setRoutine(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (!id || !Number(id)) {
      setLoading(false);
      return;
    }
    retrieveRoutine(Number(id));
  }, [id]);
  if (!loading && !routine) return <NotFound />;
  return (
    <ResponsiveCard defaultHeight='auto'>
      <SkeletonWrapper loading={loading} heights={['150px', '100px']} height='80px' repeat={6} marginY={1}>
        <Flex>
          <LinkButton to={BRoutes.RUTINES} leftIcon={<ArrowBackIcon />}>
            Volver al listado
          </LinkButton>
        </Flex>
        {routine && <RoutineDetailsContent routine={routine} />}
        {routine && <RoutineFormSegmentsStep routine={routine} onPrevious={() => {}}/>}
      </SkeletonWrapper>
    </ResponsiveCard>
  );
};

interface RoutineDetailsContentProps {
  routine: Routine;
}
const RoutineDetailsContent = ({ routine }: RoutineDetailsContentProps) => (
  <Flex direction='column'>
    <Heading as='h1'>{routine.name}</Heading>
    {routine.description && (
      <Heading size='md' as='h2'>
        {routine.description}
      </Heading>
    )}
  </Flex>
);

const NotFound = () => (
  <ResponsiveCard>
    <Alert display='flex' gap={3} flexGrow={1} flexDirection='column' alignItems='center' justifyContent='center' background='transparent'>
      <Image src={missingIllustration} aria-hidden width={150} className='hue-adaptative' />
      <Text fontSize='lg' maxWidth={350} textAlign='center'>
        Lo sentimos, no hemos podido encontrar la rutina solicitada.
      </Text>
      <LinkButton to={BRoutes.RUTINES} leftIcon={<ArrowBackIcon />}>
        Volver al listado
      </LinkButton>
    </Alert>
  </ResponsiveCard>
);

export default RoutineDetails;
