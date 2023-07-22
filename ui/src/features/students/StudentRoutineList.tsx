import ResponsiveCard from '../../components/common/ResponsiveCard';
import { Divider, Flex, Heading, Icon, List, ListItem, Tag, Text, Tooltip, Wrap, WrapItem } from '@chakra-ui/react';
import { ReducedRoutine } from '../../model/routines/Routine';
import LinkButton from '../../components/common/LinkButton';
import { Fragment } from 'react';
import SkeletonWrapper from '../../components/common/SkeletonWrapper';
import { BikeIcon, StopwatchIcon } from '../../components/common/Icons';
import useGenericList from '../../hooks/useGenericList';
import StudentService from '../../services/api/StudentService';
import SimpleBreadcrumbs from '../../components/common/SimpleBreadcrumbs';
import Role from '../../model/user/Role';

interface Props {
  showBreadcrumbs?: boolean;
}
const StudentRoutineList = ({ showBreadcrumbs }: Props) => {
  const { data: routines, loading } = useGenericList<ReducedRoutine>(() => StudentService.getRoutines(), { initialFetch: true });
  return (
    <ResponsiveCard defaultHeight='auto' minHeight='none' defaultWidth='800px' padding={{ base: 1, sm: 6 }}>
      {showBreadcrumbs && <SimpleBreadcrumbs items={[{ title: 'Rutinas' }]} />}
      <Flex direction='column' gap={2} mb={3}>
        <Heading size='md'>Rutinas</Heading>
        {!loading && !!routines.length && <Text color='text.300'>Tu instructor te ha asignado las siguientes rutinas:</Text>}
      </Flex>
      <SkeletonWrapper repeat={7} height={50} loading={loading} marginBottom={2}>
        {!loading && !routines.length && (
          <Flex direction='column' alignItems='center' textAlign='center' paddingY={5}>
            <Text>Aquí podrás ver las rutinas que te asigne tu instructor.</Text>
            <Text fontWeight='bold'>Aún no te han asignado ninguna rutina</Text>
          </Flex>
        )}
        <Flex direction='column' grow={1}>
          <List spacing={2} borderRadius='lg' mb={3}>
            {routines.map((r, index) => (
              <Fragment key={r.id}>
                <StudentRoutineListItem routine={r} />
                {index + 1 < routines.length && <Divider _dark={{ display: 'none' }} />}
              </Fragment>
            ))}
          </List>
        </Flex>
      </SkeletonWrapper>
    </ResponsiveCard>
  );
};

export const StudentRoutineListItem = ({ routine, role = Role.STUDENT }: { routine: ReducedRoutine; role?: Role }) => (
  <ListItem paddingY={2} paddingX={3} borderRadius='md' borderColor='chakra-border-color' bg='bg.400'>
    <Flex justifyContent='space-between' alignItems={{ base: 'start', lg: 'center' }} flexDirection={{ base: 'column', lg: 'row' }} overflow='hidden'>
      <Flex direction='column' grow={1} shrink={0} alignSelf='start'>
        <Heading size='md' noOfLines={1} color='primary.700' _dark={{ color: 'primary.200' }}>
          {routine.name}
        </Heading>
        <Flex minHeight='1rem' overflow='hidden' minWidth={0}>
          {routine.description && (
            <Text fontWeight='normal' aria-label='descripción' fontSize='md' noOfLines={1}>
              {routine.description}
            </Text>
          )}
        </Flex>
      </Flex>
      <Wrap justify='end' minWidth={0} marginLeft='auto' overflow='visible'>
        {!!Number(routine.totalDuration) && (
          <WrapItem>
            <Tooltip hasArrow label={`Duracion total`}>
              <Tag borderRadius='20px' colorScheme='blue' justifyContent='center' aria-label={`${10} minutos`}>
                <Icon as={StopwatchIcon} mr={1} aria-hidden /> {routine.totalDuration} min
              </Tag>
            </Tooltip>
          </WrapItem>
        )}
        {role == Role.STUDENT && (
          <WrapItem>
            <LinkButton to={`#no-implementado`} size='sm' colorScheme='primary' whiteSpace='normal' leftIcon={<Icon as={BikeIcon} boxSize={4} />}>
              Registrar Entrenamiento
            </LinkButton>
          </WrapItem>
        )}
        <WrapItem>
          <Flex marginLeft='auto' gap={2}>
            <LinkButton to={role == Role.INSTRUCTOR ? `/rutinas/${routine.id}` : `/alumno/rutinas/${routine.id}`} size='sm'>
              Ver detalles
            </LinkButton>
          </Flex>
        </WrapItem>
      </Wrap>
    </Flex>
  </ListItem>
);
export default StudentRoutineList;
