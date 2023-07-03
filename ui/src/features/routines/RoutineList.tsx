import ResponsiveCard from '../../components/common/ResponsiveCard';
import {
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VisuallyHidden,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, PlusSquareIcon, Search2Icon } from '@chakra-ui/icons';
import Routine from '../../model/routines/Routine';
import LinkButton from '../../components/common/LinkButton';
import { routinesMock } from './routineMocks';
import { useState, useEffect, Fragment, useMemo, useRef } from 'react';
import RoutineService from '../../services/api/RoutineService';
import { StopwatchIcon } from '../../components/common/Icons';
import SkeletonWrapper from '../../components/common/SkeletonWrapper';
import Paginator from '../../components/common/Paginator';
import usePagination from '../../hooks/usePagination';

const RoutineList = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const filteredRoutines = useMemo(() => {
    if (!search) return routines;
    const sanitized = search.toLowerCase();
    return routines.filter((r) => [r.name, r.description].find((v) => v?.toLowerCase().includes(sanitized)));
  }, [routines, search]);

  const pagination = usePagination(filteredRoutines, 1);

  const retrieveRoutines = async () => {
    setLoading(true);
    const res = await RoutineService.getInstructorRoutines();
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
        <LinkButton to='crear' colorScheme='primary' gap={2} size={['sm', 'md']}>
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
      <SkeletonWrapper repeat={5} height={50} loading={loading} marginBottom={2}>
        {!loading && !filteredRoutines.length && (
          <Text paddingY={5} textAlign='center'>
            {!routines.length ? 'Aún no has agregado ninguna rutina' : 'No se han encontrado rutinas'}
          </Text>
        )}
        <Flex direction='column'  grow={1}>
          <List spacing={1} bg='bg.400' borderRadius='lg' mb={3} >
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

const RoutineListItem = ({ routine }: { routine: Routine }) => (
  <ListItem padding={2} paddingX={3} borderRadius='md' borderColor='chakra-border-color'>
    <Flex justifyContent='space-between' alignItems={['start', 'center']} flexDirection={['column', 'row']}>
      <Flex direction='column'>
        <Heading size='md'>{routine.name}</Heading>
        <Text color='text.300' fontWeight='normal'>
          {routine.name}
        </Text>
      </Flex>
      <Flex gap={3} alignSelf='stretch' alignItems='center' justifyContent={['space-between', 'center']}>
        <Tooltip hasArrow label={`Duracion total: 60 minutos`}>
          <Tag borderRadius='full' boxSize='40px' colorScheme='cyan' justifyContent='center'>
            10'
          </Tag>
        </Tooltip>
        <LinkButton to={`${routine.id}`} size='sm' onClick={() => null}>
          Ver detalles
        </LinkButton>
      </Flex>
    </Flex>
  </ListItem>
);
export default RoutineList;
