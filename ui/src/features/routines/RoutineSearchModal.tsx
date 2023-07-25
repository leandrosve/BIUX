import { ExternalLinkIcon, Search2Icon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading, Input,
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
    Spinner, Text,
    Tooltip,
    VisuallyHidden
} from '@chakra-ui/react';
import { useState, useRef, useMemo } from 'react';
import Form from '../../components/common/Form';
import useGenericList from '../../hooks/useGenericList';
import InstructorService from '../../services/api/InstructorService';
import { ReducedRoutine } from '../../model/routines/Routine';
import LinkButton from '../../components/common/LinkButton';
import useSimpleList from '../../hooks/useSimpleList';

interface Props {
  selected: number[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (routines: ReducedRoutine[]) => void;
  studentId: number;
}

const RoutineSelectorModal = ({ selected, isOpen, onClose,onSuccess, studentId }: Props) => {
  const [searchText, setSearchText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const initialSelectedIds = useMemo(() => new Set(selected), [selected]);
  const { items: selectedIds, add, remove } = useSimpleList(selected);

  const showSaveButton = useMemo(() => {
    return !(selectedIds.length === selected.length && selectedIds.every((id) => initialSelectedIds.has(id)));
  }, [selectedIds, selected, initialSelectedIds]);

  const { data: routines, loading } = useGenericList(() => InstructorService.getRoutines(), { initialFetch: true });
  const filteredRoutines = useMemo(() => {
    if (!searchText) return routines;
    const sanitized = searchText.toLowerCase();
    return routines.filter((r) => [r.name, r.description].find((v) => v?.toLowerCase().includes(sanitized)));
  }, [routines, searchText]);

  const handleToggle = (routine: ReducedRoutine) => {
    if (selectedIds.includes(routine.id)) {
      remove(routine.id);
      return;
    }
    add(routine.id);
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    const res = await InstructorService.updateStudentRoutines(studentId, selectedIds);
    if (!res.hasError) onSuccess(res.data);
    setIsSubmitting(false);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={searchInputRef} finalFocusRef={buttonRef}>
      <ModalOverlay />
      <ModalContent bg='bg.300' backdropFilter='blur(10px)'>
        <ModalHeader pb={0}>Asignar Rutinas</ModalHeader>
        <ModalCloseButton />
        <ModalBody pt={0} padding={{ base: '4px', sm: 5 }}>
          <Form onSubmit={() => setSearchText(searchText)}>
            <InputGroup size='lg' paddingBottom={3} variant='flushed' colorScheme='primary'>
              <InputLeftElement as='label' htmlFor='routine-search'>
                <VisuallyHidden>Buscar rutinas</VisuallyHidden>
                <Search2Icon color='primary.600' _dark={{ color: 'primary.200' }} />
              </InputLeftElement>
              <Input
                placeholder='Buscar Rutinas'
                id='routine-search'
                _dark={{ _placeholder: { color: 'white' } }}
                ref={searchInputRef}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </InputGroup>
          </Form>
          {loading && (
            <Box>
              <Spinner mt={5} size='lg' color='primary.400' boxSize={['50px', 100]} />
            </Box>
          )}
          <List spacing={2} maxHeight={500} overflowY='auto'>
            {filteredRoutines.map((routine) => (
              <RoutineListItem
                key={routine.id}
                routine={routine}
                isChecked={selectedIds.includes(routine.id)}
                onClick={(r) => {
                  handleToggle(r);
                }}
              />
            ))}
            {!filteredRoutines.length && (
              <Flex direction='column' gap={2} alignItems='center'>
                <Text align='center'>No se han encontrado resultados</Text>
                <Button size='sm' onClick={() => setSearchText('')}>
                  Limpiar búsqueda
                </Button>
              </Flex>
            )}
            {!routines.length && <Text align='center'>Aún no has creado ningúna rutina</Text>}
          </List>

          <Flex justifyContent='space-between' mt={3}>
            <Button onClick={onClose}>Cancelar</Button>
            <Tooltip hasArrow label='No se han efectuado cambios' hidden={showSaveButton}>
              <Button isDisabled={!showSaveButton} colorScheme='primary' onClick={onSubmit} isLoading={isSubmitting}>
                Guardar
              </Button>
            </Tooltip>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const RoutineListItem = ({
  routine,
  onClick,
  isChecked,
}: {
  routine: ReducedRoutine;
  onClick: (routine: ReducedRoutine) => void;
  isChecked: boolean;
}) => (
  <ListItem
    paddingY={1}
    paddingX={3}
    borderRadius='md'
    borderColor='chakra-border-color'
    className='selectable-item'
    onClick={(e) => {
      e.preventDefault();
      onClick(routine);
    }}
  >
    <Flex justifyContent='space-between' alignItems={['start', 'center']} flexDirection={['column', 'row']} overflow='hidden'>
      <Flex direction='column' minWidth={0}>
        <Heading size='md' noOfLines={1} color='primary.700' _dark={{ color: 'primary.200' }}>
          {routine.name}{' '}
          <LinkButton
            external
            to={`/rutinas/${routine.id}`}
            variant='ghost'
            size='xs'
            color='inherit'
            onClick={(e) => e.stopPropagation()}
            aria-label='Ir a detalle de rutina'
          >
            <ExternalLinkIcon />
          </LinkButton>
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
        <Flex marginLeft='auto'>
          <Checkbox
            colorScheme='primary'
            mr={2}
            className='checkbox'
            onChange={(e) => {
              e.preventDefault();
              onClick(routine);
            }}
            isChecked={isChecked}
          />
        </Flex>
      </Flex>
    </Flex>
  </ListItem>
);

export default RoutineSelectorModal;
