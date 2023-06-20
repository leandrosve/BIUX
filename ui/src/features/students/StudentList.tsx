import React from 'react';
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
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Table,
  TableCaption,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import AutoBreadcrumbs from '../../layout/AutoBreadcrumbs';
import { ChevronDownIcon, EditIcon, PlusSquareIcon, Search2Icon } from '@chakra-ui/icons';

interface Student {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  entrenamientos: number;
}
const columns = [
  {
    title: 'Nombre',
    accesor: (s: Student) => `${s.firstName} ${s.lastName}`,
  },
  {
    title: 'Email',
    accesor: (s: Student) => s.email,
  },
  {
    title: 'Performance',
    accesor: (s: Student) => (
      <Tag variant='solid' colorScheme='green'>
        {s.entrenamientos || '-'}
      </Tag>
    ),
  },
  {
    title: 'Acciones',
    accesor: (s: Student) => <Actions student={s} />,
  },
];

const studentsMock: Student[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    entrenamientos: 5,
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    entrenamientos: 3,
  },
  {
    id: 3,
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    entrenamientos: 2,
  },
  {
    id: 4,
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.brown@example.com',
    entrenamientos: 1,
  },
  {
    id: 5,
    firstName: 'David',
    lastName: 'Davis',
    email: 'david.davis@example.com',
    entrenamientos: 4,
  },
];

const Actions = ({ student }: { student: Student }) => (
  <Flex>
    <Button size='sm' onClick={() => null}>
      Ver detalle
    </Button>
  </Flex>
);

const StudentList = () => {
  return (
    <>
      <AutoBreadcrumbs />
      <ResponsiveCard defaultHeight='auto' paddingY={3} marginBottom={5} rounded='md'>
        <Flex justifyContent='space-between' alignItems='center'>
          <Heading size='md' m={0}>Invita a un alumno</Heading>
          <IconButton variant='ghost' borderRadius='50%' display='flex' aria-label='expand' icon={<Icon as={PlusSquareIcon} />} />
        </Flex>
      </ResponsiveCard>
      <ResponsiveCard defaultHeight='auto'>
        <Heading>Alumnos</Heading>

        <TableContainer>
          <Flex justifyContent='space-between' marginY={3}>
            <InputGroup size='sm' maxWidth={300}>
              <Input placeholder='Buscar' />
              <InputRightElement>
                <Search2Icon />
              </InputRightElement>
            </InputGroup>

            <Menu placement='left'>
              <MenuButton as={Button} variant='outline' paddingX={3} aria-label='Ordenar' size='small' children='Ordenar' />
              <MenuList>
                <MenuItem>Afabetico (A-Z)</MenuItem>
                <MenuItem>Performance </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Table variant='simple' size='sm'>
            <Thead>
              <Tr>
                {columns.map((c) => (
                  <Th key={c.title}>{c.title}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {studentsMock.map((s) => (
                <Tr>
                  {columns.map((c, index) => (
                    <Td key={index}>{c.accesor(s)}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </ResponsiveCard>
    </>
  );
};

export default StudentList;
