import { Search2Icon } from '@chakra-ui/icons';
import {
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
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import { useState, useRef, useMemo } from 'react';
import Form from '../../components/common/Form';
import BAvatar from '../../components/common/BAvatar';
import studentsMock from './studentsMock';

interface Props {
  selected: number[];
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const StudentSelectorModal = ({ selected, onAdd, onRemove, isOpen, onClose }: Props) => {
  const [searchText, setSearchText] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const selectedIds = useMemo(() => new Set(selected), [selected]);

  const filteredStudents = useMemo(() => {
    if (!searchText) return studentsMock;
    const sanitized = searchText.toLowerCase();
    return studentsMock.filter(({ user }) => [user.firstName, user.lastName, user.email].find((v) => v?.toLowerCase().includes(sanitized)));
  }, [studentsMock, searchText]);

  const handleToggle = (id: number) => {
    if (selectedIds.has(id)) {
      onRemove(id);
      return;
    }
    onAdd(id);
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

          <List spacing={2} maxHeight={500} overflowY='auto'>
            {filteredStudents.map(({ user, id }) => (
              <ListItem
                position='relative'
                bg='bg.400'
                key={id}
                padding={2}
                transition='200ms'
                cursor='pointer'
                aria-selected={selectedIds.has(id)}
                borderRadius='lg'
                borderColor='chakra-border-color'
                _notLast={{ borderBottomWidth: '1px' }}
                className='selectable-item'
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle(id);
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
                      handleToggle(id);
                    }}
                    isChecked={selectedIds.has(id)}
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
