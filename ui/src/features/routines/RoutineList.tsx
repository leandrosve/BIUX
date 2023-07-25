import ResponsiveCard from '../../components/common/ResponsiveCard';
import {
  Button,
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
import { InfoIcon, PlusSquareIcon, Search2Icon } from '@chakra-ui/icons';
import { ReducedRoutine } from '../../model/routines/Routine';
import LinkButton from '../../components/common/LinkButton';
import { useState, useEffect, Fragment, useMemo, useContext } from 'react';
import SkeletonWrapper from '../../components/common/SkeletonWrapper';
import Paginator from '../../components/common/Paginator';
import usePagination from '../../hooks/usePagination';
import { StopwatchIcon } from '../../components/common/Icons';
import { InstructorRoutinesContext } from '../../context/ListsProviders';
import SimpleBreadcrumbs from '../../components/common/SimpleBreadcrumbs';

const RoutineList = () => {
  const {
    fetch: fetchRoutines,
    initialized,
    data: routines,
    loading,
    page,
    onPageChange,
    searchText,
    onSearchTextChange,
  } = useContext(InstructorRoutinesContext);

  const [searchInputValue, setSearchInputValue] = useState<string>(searchText);

  const filteredRoutines = useMemo(() => {
    if (!searchText) return routines;
    const sanitized = searchText.toLowerCase();
    return routines.filter((r) => [r.name, r.description].find((v) => v?.toLowerCase().includes(sanitized)));
  }, [routines, searchText]);

  const pagination = usePagination(filteredRoutines, 5, page, onPageChange);

  useEffect(() => {
    if (!initialized) fetchRoutines();
  }, []);

  return (
    <ResponsiveCard defaultHeight='auto' defaultWidth='800px'>
      <SimpleBreadcrumbs items={[{ title: 'Rutinas' }]} />
      <Flex justifyContent='space-between' marginY={3} alignItems='center'>
        <Heading>Rutinas</Heading>

        <LinkButton to='/rutinas/crear' colorScheme='primary' gap={2} size={['sm', 'md']} whiteSpace='initial'>
          <Icon as={PlusSquareIcon} /> Nueva Rutina
        </LinkButton>
      </Flex>
      <Flex mb={3} alignItems='center' color='text.300'>
        <Icon as={InfoIcon} mr={2} />
        <Text fontSize='sm'>Hemos creado automáticamente algunas rutinas para facilitar las pruebas.</Text>
      </Flex>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearchTextChange(searchInputValue);
        }}
      >
        <InputGroup size='sm' maxWidth={300} paddingBottom={3}>
          <label htmlFor='routine-list-search'>
            <VisuallyHidden>Buscar rutinas</VisuallyHidden>
            <InputRightElement>
              <Search2Icon />
            </InputRightElement>
          </label>
          <Input
            borderRadius='md'
            placeholder='Buscar'
            id='routine-list-search'
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
        </InputGroup>
      </form>
      <SkeletonWrapper repeat={7} height={50} loading={loading} marginBottom={2}>
        {!loading && !filteredRoutines.length && (
          <Flex direction='column' alignItems='center'>
            <Text paddingY={5} textAlign='center'>
              {!routines.length ? 'Aún no has agregado ninguna rutina' : 'No se han encontrado rutinas'}
            </Text>
            {searchText && (
              <Button
                onClick={() => {
                  setSearchInputValue('');
                  onSearchTextChange('');
                }}
              >
                Limpiar búsqueda
              </Button>
            )}
          </Flex>
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
    <Flex justifyContent='space-between' alignItems={['start', 'center']} flexDirection={['column', 'row']} overflow='hidden'>
      <Flex direction='column' minWidth={0}>
        <Heading size='md' noOfLines={1} color='primary.700' _dark={{ color: 'primary.200' }}>
          {routine.name}
        </Heading>
        <Flex minHeight='1rem' overflow='hidden' minWidth={0}>
          {routine.description && (
            <Text color='text.300' fontWeight='normal' aria-label='descripción' fontSize='md' noOfLines={1}>
              {routine.description}
            </Text>
          )}
        </Flex>
      </Flex>
      <Flex gap={3} alignSelf='stretch' alignItems='center' justifyContent={['space-between', 'center']} shrink={0}>
        {!!Number(routine.totalDuration) && (
          <Tooltip hasArrow label={`Duracion total`}>
            <Tag borderRadius='20px' colorScheme='blue' justifyContent='center' aria-label={`${10} minutos`}>
              <Icon as={StopwatchIcon} mr={1} aria-hidden /> {routine.totalDuration} min
            </Tag>
          </Tooltip>
        )}
        <Flex marginLeft='auto'>
          <LinkButton to={`/rutinas/${routine.id}`} size='sm'>
            Ver detalles
          </LinkButton>
        </Flex>
      </Flex>
    </Flex>
  </ListItem>
);
export default RoutineList;
