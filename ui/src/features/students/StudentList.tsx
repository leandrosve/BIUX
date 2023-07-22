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
  MenuButton, MenuItem,
  MenuList,
  Table, TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead, Tr
} from '@chakra-ui/react';
import AutoBreadcrumbs from '../../layout/AutoBreadcrumbs';
import { PlusSquareIcon, Search2Icon } from '@chakra-ui/icons';
import { InstructorStudentsContext } from '../../context/ListsProviders';
import { useState, useEffect, Fragment, useMemo, useContext } from 'react';
import { ReducedStudent } from '../../model/student/Student';

const columns = [
  {
    title: 'Nombre',
    accesor: (s: ReducedStudent) => `${s.firstName} ${s.lastName}`,
  },
  {
    title: 'Email',
    accesor: (s: ReducedStudent) => s.email,
  },
  {
    title: 'Performance',
    accesor: (s: ReducedStudent) => (
      <Tag variant='solid' colorScheme='green'>
        { '-'}
      </Tag>
    ),
  },
  {
    title: 'Acciones',
    accesor: (s: ReducedStudent) => <Actions student={s} />,
  },
];



const Actions = ({ student }: { student: ReducedStudent }) => (
  <Flex>
    <Button size='sm' onClick={() => null}>
      Ver detalle
    </Button>
  </Flex>
);


const StudentList = () => {

  const {
    fetch: fetchStudents,
    initialized,
    data: students,
    loading,
    page,
    onPageChange,
    searchText,
    onSearchTextChange,
  } = useContext(InstructorStudentsContext);


  useEffect(() => {
    fetchStudents()
    if (!initialized) fetchStudents();
  }, []);

  return (
    <>
     
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
              {students.map((s) => (
                <Tr key={s.id}>
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
