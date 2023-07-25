import ResponsiveCard from '../../components/common/ResponsiveCard';
import {
  Box,
  Button, Flex,
  Heading, Input,
  InputGroup,
  InputRightElement, SimpleGrid, TableContainer,
  Tag, Text, Tooltip, VisuallyHidden
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { InstructorStudentsContext } from '../../context/ListsProviders';
import { useState, useEffect, useContext, useMemo } from 'react';
import { ReducedStudent } from '../../model/student/Student';
import SimpleBreadcrumbs from '../../components/common/SimpleBreadcrumbs';
import InstructorShareButton from '../instructor/InstructorShareButton';
import InstructorService from '../../services/api/InstructorService';
import BAvatar from '../../components/common/BAvatar';
import LinkButton from '../../components/common/LinkButton';
import usePagination from '../../hooks/usePagination';
import Paginator from '../../components/common/Paginator';
import SkeletonWrapper from '../../components/common/SkeletonWrapper';

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
        {'-'}
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
  const [code, setCode] = useState('');
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

  const [searchInputValue, setSearchInputValue] = useState<string>(searchText);

  const filteredStudents = useMemo(() => {
    if (!searchText) return students;
    const sanitized = searchText.toLowerCase();
    return students.filter((u) => [u.email, u.firstName,u.lastName].find((v) => v?.toLowerCase().includes(sanitized)));
  }, [students, searchText]);

  const pagination = usePagination(filteredStudents, 2, page, onPageChange);



  const retrieveCode = async () => {
    const res = await InstructorService.getCode();
    if (res.hasError) return;
    setCode(res.data?.code);
  };

  useEffect(() => {
    if (!initialized) fetchStudents();
  }, [initialized, fetchStudents]);

  useEffect(() => {
    retrieveCode();
  }, []);
  return (
    <>
      <ResponsiveCard defaultHeight='auto' paddingY={3} marginBottom={5} rounded='md'>
        <SimpleBreadcrumbs items={[{ title: 'Alumnos' }]} />
        <Flex justifyContent='space-between' alignItems='center'>
          <Box>
            <Heading size='md' m={0}>
              Invita a un alumno
            </Heading>
            <Text fontSize={"sm"} color={"text.300"}>Te animamos a compartir una invitación con tus alumnos para que se unan a tu grupo.</Text>
          </Box>
          <InstructorShareButton code={code} />
        </Flex>
      </ResponsiveCard>
      <ResponsiveCard defaultHeight='auto'>
      <Flex justifyContent='space-between' marginY={3} alignItems='center'>
        <Heading>Alumnos</Heading>
      </Flex>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearchTextChange(searchInputValue);
          }}
        >
          <InputGroup size='sm' maxWidth={300} paddingBottom={3}>
            <label htmlFor='student-list-search'>
              <VisuallyHidden>Buscar alumnos</VisuallyHidden>
              <InputRightElement>
                <Search2Icon />
              </InputRightElement>
            </label>
            <Input placeholder='Buscar' id='student-list-search' value={searchInputValue} onChange={(e) => setSearchInputValue(e.target.value)} />
          </InputGroup>
        </form>
        
        <SkeletonWrapper repeat={7} height={50} loading={loading} marginBottom={2}>
        {!loading && !filteredStudents.length && (
          <Flex direction='column' alignItems='center'>
            <Text paddingY={5} textAlign='center'>
            {students.length ? 'No se han encontrado alumnos' : 'Usted aún no tiene alumnos asociados'}
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

        <SimpleGrid columns={{ sm: 1, md: 1 }} gap={4} mt={2}>
            {pagination.paginatedItems.map((user) => (
              <Box
                position='relative'
                bg='bg.400'
                key={user.id}
                overflow='hidden'
                borderRadius='lg'
                padding={2}
                borderColor='chakra-border-color'
                borderWidth='1px'
                display='flex'
                gap={3}
                alignItems='center'
                justifyContent='space-between'
              >
                <Flex gap={3} alignItems='center'>
                  <BAvatar aria-hidden size='sm' name={`${user.firstName} ${user.lastName}`} />
                  <Flex direction='column' alignItems='start' justifyContent='start'>
                    <Text noOfLines={1} textOverflow='ellipsis'>
                      {user.firstName} {user.lastName}
                    </Text>
                    <Text fontSize='sm' fontWeight='light' aria-label='email' noOfLines={1} textOverflow='ellipsis' wordBreak='break-all'>
                      {user.email}
                    </Text>
                  </Flex>
                </Flex>
                
                  <div>
                <LinkButton to={`/alumnos/${user.id}`} size='sm' float='right'>
                  Ver detalles
                </LinkButton>
                  </div>
                
              </Box>
            ))}
        </SimpleGrid>

      </SkeletonWrapper>
      <br />
      <Paginator
        totalElements={filteredStudents.length}
        pageSize={pagination.pageSize}
        currentPage={pagination.currentPage}
        onChange={pagination.onChange}
      />
      </ResponsiveCard>
    </>
  );
};

export default StudentList;
