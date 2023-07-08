import { DeleteIcon, Search2Icon } from '@chakra-ui/icons';
import { Button, Flex, IconButton, List, ListItem, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';
import StudentSelectorModal from './StudentSelectorModal';
import studentsMock from './studentsMock';
import BAvatar from '../../components/common/BAvatar';
import Student from '../../model/student/Student';

interface Props {
  selected: number[];
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
}

const StudentSearch = ({ selected, onAdd, onRemove }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const students:Student[]= useMemo(() => {
    return selected.map(id => studentsMock.find((s) => s.id === id)).filter((i): i is Student => !!i);
  }, [selected, studentsMock]);
  return (
    <>
      <Button
        display='flex'
        justifyContent='start'
        onClick={onOpen}
        alignItems='center'
        gap={4}
        variant='outline'
        id='search-students-button'
        boxShadow='sm'
        background='bg.400'
        fontWeight='medium'
        border='1px solid'
        borderColor='chakra-border-color'
        ref={buttonRef}
      >
        <Search2Icon /> <span>Buscar alumnos</span>
      </Button>
      <StudentSelectorModal isOpen={isOpen} onClose={onClose} selected={selected} onAdd={onAdd} onRemove={onRemove} />

      {!!students?.length && (
        <List mt={3} maxHeight={250} overflowY='auto' borderRadius='lg' border='1px solid' borderColor='chakra-border-color'>
          {students.map(({ user, id }) => (
            <ListItem
              position='relative'
              bg='bg.400'
              key={user.id}
              padding={2}
              borderColor='chakra-border-color'
              _notLast={{ borderBottomWidth: '1px' }}
            >
              <Flex justifyContent='space-between' alignItems='center' gap={1}>
                <Flex alignItems='center' gap={3}>
                  <BAvatar aria-hidden size='sm' name={`${user.firstName} ${user.lastName}`} />
                  <Flex direction='column'>
                    <Text>
                      {user.firstName} {user.lastName}
                    </Text>
                    <Text fontSize='sm' fontWeight='light' aria-label='email'>
                      {user.email}
                    </Text>
                  </Flex>
                </Flex>
                <Tooltip hasArrow label='Desasignar alumno de esta rutina' placement='right' aria-label='A tooltip' openDelay={600}>
                  <IconButton icon={<DeleteIcon />} aria-label='Eliminar segmento' variant='ghost' colorScheme='red' onClick={() => onRemove(id)} />
                </Tooltip>
              </Flex>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default StudentSearch;
