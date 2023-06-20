import ResponsiveCard from '../../components/common/ResponsiveCard';
import {
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VisuallyHidden,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, PlusSquareIcon, Search2Icon } from '@chakra-ui/icons';
import Routine from '../../model/routines/Routine';
import LinkButton from '../../components/common/LinkButton';
import { routinesMock } from './routineMocks';

const columns = [
  {
    title: 'Nombre',
    accesor: (r: Routine) => (
      <Text maxWidth={200} overflow='hidden' textOverflow='ellipsis'>
        {r.name}
      </Text>
    ),
  },
  {
    title: 'Descripción',
    accesor: (r: Routine) => (
      <Text maxWidth={400} overflow='hidden' textOverflow='ellipsis'>
        {r.description}
      </Text>
    ),
  },
  {
    title: 'Segmentos',
    accesor: (r: Routine) => `${r.segments.length}`,
  },
  {
    title: 'Acciones',
    accesor: (r: Routine) => <Actions routine={r} />,
  },
];

const Actions = ({ routine }: { routine: Routine }) => (
  <Flex>
    <LinkButton to={`${routine.id}`} size='sm' onClick={() => null}>
      Ver detalles
    </LinkButton>
  </Flex>
);

const RoutineList = () => {
  return (
    <ResponsiveCard defaultHeight='auto'>
      <Flex justifyContent='space-between' marginY={3} alignItems='center'>
        <Heading>Rutinas</Heading>
        <LinkButton to='crear' colorScheme='primary' gap={2} size={['sm', 'md']}>
          <Icon as={PlusSquareIcon} /> Nueva Rutina
        </LinkButton>
      </Flex>
      <TableContainer>
        <form>
          <InputGroup size='sm' maxWidth={300} paddingBottom={3}>
            <label htmlFor='routine-list-search'>
              <VisuallyHidden>Buscar rutinas</VisuallyHidden>
              <InputRightElement>
                <Search2Icon />
              </InputRightElement>
            </label>
            <Input placeholder='Buscar' id='routine-list-search' />
          </InputGroup>
        </form>
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              {columns.map((c) => (
                <Th key={c.title}>{c.title}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {routinesMock.map((s, i) => (
              <Tr key={i}>
                {columns.map((c, index) => (
                  <Td key={index}>{c.accesor(s)}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justifyContent='center' mt={3}>
        <Flex as='nav' gap={1}>
          <IconButton icon={<ChevronLeftIcon />} size='sm' aria-label='Ir a pagina anterior' />
          {[1, 2, 3, 4].map((page) => (
            <Button
              key={page}
              size='sm'
              aria-current={page == 3}
              variant={page === 3 ? 'solid' : 'outline'}
              colorScheme={page === 3 ? 'primary' : 'gray'}
            >
              {page}
            </Button>
          ))}{' '}
          <IconButton icon={<ChevronRightIcon />} size='sm' aria-label='Ir a pagina anterior' />
        </Flex>
      </Flex>
    </ResponsiveCard>
  );
};

export default RoutineList;
