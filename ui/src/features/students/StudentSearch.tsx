import { DeleteIcon, Search2Icon } from '@chakra-ui/icons';
import { Button, Flex, IconButton, List, ListItem, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';
import StudentSelectorModal from './StudentSelectorModal';
import BAvatar from '../../components/common/BAvatar';
import { ReducedStudent } from '../../model/student/Student';

interface Props {
  selected: ReducedStudent[];
  onAdd: (student: ReducedStudent) => void;
  onRemove: (student: ReducedStudent) => void;
}

const StudentSearch = ({ selected, onAdd, onRemove }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedIds = useMemo(() => selected.map((s) => s.id), [selected]);
  const buttonRef = useRef<HTMLButtonElement>(null);
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
      <StudentSelectorModal isOpen={isOpen} onClose={onClose} selected={selectedIds} onAdd={onAdd} onRemove={onRemove} />

      {!!selected?.length && (
        <List mt={3} maxHeight={250} overflowY='auto' borderRadius='lg' border='1px solid' borderColor='chakra-border-color'>
          {selected.map((user) => (
            <ListItem
              position='relative'
              bg='bg.400'
              key={user.id}
              padding={2}
              borderColor='chakra-border-color'
              _notLast={{ borderBottomWidth: '1px' }}
            >
              <Flex justifyContent='space-between' alignItems='center' gap={1}>
                <Flex alignItems='center' gap={3} overflow='hidden'>
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
                <Tooltip hasArrow label='Desasignar alumno de esta rutina' placement='right' aria-label='A tooltip' openDelay={600}>
                  <IconButton icon={<DeleteIcon />} aria-label='Eliminar segmento' variant='ghost' colorScheme='red' onClick={() => onRemove(user)} />
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
