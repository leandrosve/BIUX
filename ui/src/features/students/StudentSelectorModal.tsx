import { Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import { useState, useRef, useMemo } from 'react';
import Form from '../../components/common/Form';
import BAvatar from '../../components/common/BAvatar';
import studentsMock from './studentsMock';
import useGenericList from '../../hooks/useGenericList';
import InstructorService from '../../services/api/InstructorService';
import { ReducedStudent } from '../../model/student/Student';

interface Props {
  selected: number[];
  onAdd: (student: ReducedStudent) => void;
  onRemove: (student: ReducedStudent) => void;
  isOpen: boolean;
  onClose: () => void;
}

const StudentSelectorModal = ({ selected, onAdd, onRemove, isOpen, onClose }: Props) => {
  const [searchText, setSearchText] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const selectedIds = useMemo(() => new Set(selected), [selected]);
  const {data:students, loading} = useGenericList(() => InstructorService.getStudents(), {initialFetch: true});
  const filteredStudents = useMemo(() => {
    if (!students.length) return [];
    if (!searchText) return students;
    const sanitized = searchText.toLowerCase();
    return students.filter((user) => [user.firstName, user.lastName, user.email].find((v) => v?.toLowerCase().includes(sanitized)));
  }, [students, searchText]);

  const handleToggle = (student: ReducedStudent) => {
    if (selectedIds.has(student.id)) {
      onRemove(student);
      return;
    }
    onAdd(student);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={searchInputRef} finalFocusRef={buttonRef}>
      <ModalOverlay />
      <ModalContent bg='bg.300' backdropFilter='blur(10px)'>
        <ModalHeader pb={0}>Asignar alumnos</ModalHeader>
        <ModalCloseButton />
        <ModalBody pt={0} padding={{ base: '4px', sm: 5 }}>
          <Form onSubmit={() => setSearchText(searchText)}>
            <InputGroup size='lg' paddingBottom={3} variant='flushed' colorScheme='primary'>
              <InputLeftElement as='label' htmlFor='student-search'>
                <VisuallyHidden>Buscar alumnos</VisuallyHidden>
                <Search2Icon color='primary.600' _dark={{ color: 'primary.200' }} />
              </InputLeftElement>
              <Input
                placeholder='Buscar Alumnos'
                id='student-search'
                _dark={{ _placeholder: { color: 'white' } }}
                ref={searchInputRef}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </InputGroup>
          </Form>
          {loading && <Box><Spinner mt={5} size='lg' color='primary.400' boxSize={['50px', 100]}/></Box>}
          <List spacing={2} maxHeight={500} overflowY='auto'>
            {filteredStudents.map((user) => (
              <ListItem
                position='relative'
                bg='bg.400'
                key={user.id}
                padding={2}
                transition='200ms'
                cursor='pointer'
                aria-selected={selectedIds.has(user.id)}
                borderRadius='lg'
                borderColor='chakra-border-color'
                _notLast={{ borderBottomWidth: '1px' }}
                className='selectable-item'
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle(user);
                }}
              >
                <Flex justifyContent='space-between' alignItems='center' gap={1}>
                  <Flex alignItems='center' gap={[1, 3]} userSelect='none' minWidth={0} overflow='hidden'>
                    <BAvatar aria-hidden size='sm' name={`${user.firstName} ${user.lastName}`} />
                    <Flex direction='column' minWidth={0}>
                      <Text>
                        {user.firstName} {user.lastName}
                      </Text>
                      <Text fontSize='sm' fontWeight='light' aria-label='email'>
                        {user.email}
                      </Text>
                    </Flex>
                  </Flex>
                  <Checkbox
                    colorScheme='primary'
                    mr={2}
                    className='checkbox'
                    onChange={(e) => {
                      e.preventDefault();
                      handleToggle(user);
                    }}
                    isChecked={selectedIds.has(user.id)}
                  />
                </Flex>
              </ListItem>
            ))}
            {!!studentsMock.length && !filteredStudents.length && (
              <Flex direction='column' gap={2} alignItems='center'>
                <Text align='center'>No se han encontrado resultados</Text>
                <Button size='sm' onClick={() => setSearchText('')}>
                  Limpiar búsqueda
                </Button>
              </Flex>
            )}
            {!studentsMock.length && <Text align='center'>Aún no tienes ningún alumno</Text>}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StudentSelectorModal;
