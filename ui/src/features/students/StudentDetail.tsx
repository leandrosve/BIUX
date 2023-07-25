import ResponsiveCard from '../../components/common/ResponsiveCard';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Wrap,
  WrapItem,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { BRoutes } from '../../router/routes';
import SkeletonWrapper from '../../components/common/SkeletonWrapper';
import SimpleBreadcrumbs from '../../components/common/SimpleBreadcrumbs';
import { RoutineDetailLabel } from '../routines/RoutineDetails';
import ResourceNotFound from '../../components/common/ResourceNotFound';
import useAPIRequest from '../../hooks/useAPIRequest';
import InstructorService from '../../services/api/InstructorService';
import BAvatar from '../../components/common/BAvatar';
import { StudentFullDetails } from '../../model/student/Student';
import { StudentRoutineListItem } from './StudentRoutineList';
import { PastTrainingList } from './StudentRoutineDetail';
import BList from '../../components/common/BList';
import LinkButton from '../../components/common/LinkButton';
import { ArrowBackIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { useMemo, useState } from 'react';
import Role from '../../model/user/Role';
import RoutineTrainingChart from '../routines/RoutineTrainingChart';
import RoutineSelectorModal from '../routines/RoutineSearchModal';
import AlertToast from '../../components/common/alert-toast/AlertToast';
import { ReducedRoutine } from '../../model/routines/Routine';

const StudentDetail = () => {
  let { id, routineId } = useParams();
  const breadcrumbItems = useMemo(() => {
    if (!routineId)
      return [
        { to: '/alumnos', title: 'Alumnos' },
        { to: '#contenido', title: 'Detalle' },
      ];
    return [
      { to: '/rutinas', title: 'Rutinas' },
      { to: `/rutinas/${routineId}`, title: 'Detalle' },
      { to: `#contenido`, title: 'Alumno' },
    ];
  }, [id, routineId]);
  const { data: student, loading } = useAPIRequest<StudentFullDetails>(() => InstructorService.getStudent(Number(id)), [id]);

  if (!loading && !student)
    return <ResourceNotFound defaultWidth='600px' defaultHeight='600px' backButtonProps={{ label: 'Volver al inicio', to: BRoutes.DASHBOARD }} />;

  return (
    <ResponsiveCard defaultHeight='auto' position='relative' defaultWidth='800px' minHeight='auto'>
      <SimpleBreadcrumbs items={breadcrumbItems} />
      <SkeletonWrapper loading={loading} heights={['60px', '90px', '60px']} height='70px' repeat={7} marginY={1}>
        {student && <StudentDetailContent student={student} routineId={routineId} />}
      </SkeletonWrapper>
    </ResponsiveCard>
  );
};

interface StudentDetailContentProps {
  student: StudentFullDetails;
  routineId?: string | number;
}
const StudentDetailContent = ({ student, routineId }: StudentDetailContentProps) => {
  const [showTrainingDetails, setShowTrainingDetails] = useState(false);
  const [studentRoutines, setStudentRoutines] = useState(student.routines);
  const routineModal = useDisclosure();
  const toast = useToast();
  const [tabIndex, setTabIndex] = useState(0);
  const handleEditRoutines = (routines: ReducedRoutine[]) => {
    routineModal.onClose();
    setStudentRoutines(routines);
    toast.closeAll();
    toast({
      position: 'top-right',
      duration: 10000,
      render: (t) => (
        <AlertToast colorScheme='primary' status='success' hasProgress duration={10000} hasIcon isClosable onClose={() => toast.close(t.id || '')}>
          {'Se han guardado los cambios!'}
        </AlertToast>
      ),
    });
  };
  return (
    <Flex direction='column'>
      <LinkButton
        to={routineId ? `/rutinas/${routineId}` : '/alumnos'}
        alignSelf='start'
        type='submit'
        leftIcon={<ArrowBackIcon />}
        size={['sm', 'md']}
        mt={{ sm: 2, xl: 0 }}
        mb={2}
      >
        {routineId ? 'Volver a la rutina' : 'Volver al listado'}
      </LinkButton>
      <Flex alignItems='center' gap={5} mt={3} wrap='wrap'>
        <BAvatar name={`${student.firstName} ${student.lastName}`} size='xl' ml={{ base: 3, md: 0 }} />

        <Flex direction='column'>
          <RoutineDetailLabel htmlFor='student-name' mb={0} mt={0}>
            Nombre y apellido
          </RoutineDetailLabel>
          <Heading id='student-name' color='text.500' size='md'>
            {student.firstName} {student.lastName}
          </Heading>
          <RoutineDetailLabel htmlFor='student-email' mb={0}>
            Email
          </RoutineDetailLabel>
          <Heading id='student-email' color='text.500' size='md'>
            {student.email}
          </Heading>
        </Flex>
      </Flex>
      <Tabs variant='unstyled' colorScheme='primary' marginTop={5} onChange={(i) => setTabIndex(i)}>
        <Flex justify='space-between' wrap='wrap' gap={2}>
          <Box>
            <TabList>
              {['Rutinas', 'Entrenamientos'].map((tab) => (
                <Tab
                  fontSize='lg'
                  key={tab}
                  color='text.300'
                  fontWeight='bold'
                  _selected={{ color: 'primary.600' }}
                  _dark={{ _selected: { color: 'primary.200' } }}
                >
                  {tab}
                </Tab>
              ))}
            </TabList>
            <TabIndicator mt='-1.5px' height='2px' bg='primary.600' _dark={{ bg: 'primary.200' }} borderRadius='1px' />
          </Box>

          {tabIndex === 0 && (
            <Button
              colorScheme='primary'
              alignSelf='end'
              size='sm'
              display='flex'
              onClick={routineModal.onOpen}
              leftIcon={<PlusSquareIcon />}
              marginLeft='auto'
            >
              Asignar rutinas
            </Button>
          )}
        </Flex>
        <TabPanels>
          <TabPanel padding={1} paddingTop={2} position='relative'>
            <BList spacing={2} emptyPlaceholder='Este alumno no tiene ninguna rutina asignada'>
              {studentRoutines?.map((r) => (
                <StudentRoutineListItem routine={r} key={r.id} role={Role.INSTRUCTOR} />
              ))}
            </BList>

            <RoutineSelectorModal
              selected={studentRoutines?.map((r) => r.id)}
              onSuccess={handleEditRoutines}
              studentId={student.id}
              isOpen={routineModal.isOpen}
              onClose={routineModal.onClose}
            />
          </TabPanel>
          <TabPanel padding={1} paddingTop={2}>
            <PastTrainingList showRoutineName onOpenDetails={() => setShowTrainingDetails(true)} />
            <RoutineTrainingChart isOpen={showTrainingDetails} onClose={() => setShowTrainingDetails(false)} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default StudentDetail;
