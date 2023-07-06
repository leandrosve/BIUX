import {
  Button,
  Flex,
  FocusLock,
  FormControl,
  FormLabel,
  IconButton,
  List,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState, useEffect, Fragment, useMemo, useRef } from 'react';
import LinkButton from './LinkButton';

interface Props {
  totalElements: number;
  pageSize: number;
  currentPage: number;
  onChange: (page: number) => void;
  hideOnSinglePage?: boolean;
}
const Paginator = ({ totalElements, pageSize, currentPage, onChange, hideOnSinglePage = true }: Props) => {
  const totalPages = useMemo(() => Math.ceil(totalElements / pageSize), [totalElements, pageSize]);

  const pages: ('...' | number)[] = useMemo(() => {
    if (totalPages < 6) return Array.from({ length: totalPages }, (_, i) => i + 1); // [1, ..., lastPage]

    if (currentPage > totalPages - 3) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    if (currentPage <= 3) return [1, 2, 3, '...', totalPages];
    return [1, '...', currentPage, currentPage + 1, '...', totalPages];
  }, [totalPages, currentPage]);

  if (pages.length <= 1 && hideOnSinglePage) return null;
  return (
    <List gap='3px' display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
      <ListItem>
        <IconButton
          icon={<ChevronLeftIcon />}
          size='sm'
          aria-label='Ir a pagina anterior'
          isDisabled={currentPage <= 1}
          onClick={() => {
            onChange(currentPage - 1);
          }}
        />
      </ListItem>
      {pages.map((page, index) => (
        <ListItem margin={0} key={index}>
          {page != '...' ? (
            <Button
              key={page}
              size='sm'
              margin={0}
              aria-current={page == currentPage}
              variant={page === currentPage ? 'solid' : 'outline'}
              colorScheme={page === currentPage ? 'primary' : 'gray'}
              onClick={() => onChange(page)}
            >
              {page}
            </Button>
          ) : (
            <PageInputPopover onChange={onChange} maxPage={totalPages} />
          )}
        </ListItem>
      ))}
      <ListItem>
        <IconButton
          icon={<ChevronRightIcon />}
          size='sm'
          aria-label='Ir a pagina anterior'
          isDisabled={currentPage >= totalPages}
          onClick={() => {
            onChange(currentPage + 1);
          }}
        />
      </ListItem>
    </List>
  );
};

interface PageInputPopoverProps {
  onChange: (page: number) => void;
  maxPage: number;
}

const PageInputPopover = ({ onChange, maxPage }: PageInputPopoverProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = Number(firstFieldRef.current?.value);
    if (value > maxPage || value < 1) return;
    if (value) onChange(value);
    onClose();
  };

  return (
    <Popover isOpen={isOpen} initialFocusRef={firstFieldRef} onOpen={onOpen} onClose={onClose} placement='bottom' closeOnBlur={true}>
      <PopoverTrigger>
        <Button size='sm' margin={0} aria-label='Selector de página'>
          <span aria-hidden='true'>...</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent p={2} background='bg.400' maxWidth='100px'>
        <PopoverArrow backgroundColor='bg.400' />
        <form onSubmit={onSubmit}>
          <FormControl>
            <FormLabel htmlFor='page-field' fontSize='sm' mb='2px'>
              Página
            </FormLabel>
            <NumberInput id='page-field' size='sm' min={1} max={3}>
              <NumberInputField ref={firstFieldRef} placeholder='Página' required />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default Paginator;
