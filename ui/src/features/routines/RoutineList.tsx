import ResponsiveCard from '../../components/common/ResponsiveCard';
import {
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Tag,
  Text,
  Tooltip,
  VisuallyHidden,
} from '@chakra-ui/react';
import { PlusSquareIcon, Search2Icon } from '@chakra-ui/icons';
import Routine, { ReducedRoutine } from '../../model/routines/Routine';
import LinkButton from '../../components/common/LinkButton';
import { useState, useEffect, Fragment, useMemo, useRef } from 'react';
import SkeletonWrapper from '../../components/common/SkeletonWrapper';
import Paginator from '../../components/common/Paginator';
import usePagination from '../../hooks/usePagination';
import InstructorService from '../../services/api/InstructorService';
import { StopwatchIcon } from '../../components/common/Icons';

const RoutineList = () => {
  const [routines, setRoutines] = useState<ReducedRoutine[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const filteredRoutines = useMemo(() => {
    if (!search) return routines;
    const sanitized = search.toLowerCase();
    return routines.filter((r) => [r.name, r.description].find((v) => v?.toLowerCase().includes(sanitized)));
  }, [routines, search]);

  const pagination = usePagination(filteredRoutines, 5);

  const retrieveRoutines = async () => {
    setLoading(true);
    const res = await InstructorService.getRoutines();
    setLoading(false);
    if (res.hasError) return;
    setRoutines(res.data);
  };

  useEffect(() => {
    retrieveRoutines();
  }, []);
  return (
    <ResponsiveCard defaultHeight='auto'>
      <Flex justifyContent='space-between' marginY={3} alignItems='center'>
        <Heading>Rutinas</Heading>
        <LinkButton to='crear' colorScheme='primary' gap={2} size={['sm', 'md']} whiteSpace='initial'>
          <Icon as={PlusSquareIcon} /> Nueva Rutina
        </LinkButton>
      </Flex>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(searchRef?.current?.value || '');
        }}
      >
        <InputGroup size='sm' maxWidth={300} paddingBottom={3}>
          <label htmlFor='routine-list-search'>
            <VisuallyHidden>Buscar rutinas</VisuallyHidden>
            <InputRightElement>
              <Search2Icon />
            </InputRightElement>
          </label>
          <Input placeholder='Buscar' id='routine-list-search' ref={searchRef} />
        </InputGroup>
      </form>
      <SkeletonWrapper repeat={7} height={50} loading={loading} marginBottom={2}>
        {!loading && !filteredRoutines.length && (
          <Text paddingY={5} textAlign='center'>
            {!routines.length ? 'Aún no has agregado ninguna rutina' : 'No se han encontrado rutinas'}
          </Text>
        )}
        <Flex direction='column' grow={1}>
          <List spacing={1} bg='bg.400' borderRadius='lg' mb={3}>
            {pagination.paginatedItems.map((r, index) => (
              <Fragment key={r.id}>
                <RoutineListItem routine={r} />
                {index + 1 < pagination.paginatedItems.length && <Divider />}
              </Fragment>
            ))}
          </List>
        </Flex>
      </SkeletonWrapper>
      <Paginator
        totalElements={filteredRoutines.length}
        pageSize={pagination.pageSize}
        currentPage={pagination.currentPage}
        onChange={pagination.onChange}
      />
    </ResponsiveCard>
  );
};

const RoutineListItem = ({ routine }: { routine: ReducedRoutine }) => (
  <ListItem paddingY={1} paddingX={3} borderRadius='md' borderColor='chakra-border-color'>
    <Flex justifyContent='space-between' alignItems={['start', 'center']} flexDirection={['column', 'row']}>
      <Flex direction='column'>
        <Heading size='md' aria-label='nombre' color='primary.700' _dark={{ color: 'primary.200' }}>
          {routine.name}
        </Heading>
        <Text color='text.300' fontWeight='normal' aria-label='descripción'>
          {routine.name}
        </Text>
      </Flex>
      <Flex gap={3} alignSelf='stretch' alignItems='center' justifyContent={['space-between', 'center']}>
        {!!routine.totalDuration && (
          <Tooltip hasArrow label={`Duracion total`}>
            <Tag borderRadius='full' colorScheme='cyan' justifyContent='center' aria-label={`${10} minutos`}>
              <Icon as={StopwatchIcon} mr={1}/> {routine.totalDuration} min
            </Tag>
          </Tooltip>
        )}
        <LinkButton to={`${routine.id}`} size='sm'>
          Ver detalles
        </LinkButton>
      </Flex>
    </Flex>
  </ListItem>
);
export default RoutineList;
