import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';

interface ShowOptions {
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
  finalFocusRef?: React.RefObject<HTMLButtonElement>;
}
const useAlertDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState<string | null>();
  const [description, setDescription] = useState<string | null>();
  const confirmRef = useRef<(() => void) | null>(null);
  const [extraOptions, setExtraOptions] = useState<ShowOptions>();
  const show = (title: string, description: string, onConfirm: () => void, options?: ShowOptions) => {
    confirmRef.current = onConfirm;
    setTitle(title);
    setDescription(description);
    setIsOpen(true);
    setExtraOptions(options);
  };

  const handleConfirm = () => {
    if (confirmRef.current) confirmRef.current();
    setIsOpen(false);
  };
  const handleClose = () => {
    setIsOpen(false);
    confirmRef.current = null;
  };

  return {
    render: () => (
      <AlertDialogModal isOpen={isOpen} title={title} description={description} onConfirm={handleConfirm} onClose={handleClose} {...extraOptions} />
    ),
    show,
  };
};
interface AlertDialogModalProps {
  title?: string | null;
  description?: string | null;
  onConfirm: () => void;
  onClose: () => void;
  isOpen: boolean;
  confirmText?: string;
  cancelText?: string;
  finalFocusRef?: React.RefObject<HTMLButtonElement>;
}
const AlertDialogModal = (props: AlertDialogModalProps) => {
  const cancelRef = useRef(null);

  return (
    <>
      <AlertDialog isOpen={props.isOpen} finalFocusRef={props.finalFocusRef} leastDestructiveRef={cancelRef} onClose={props.onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent background='bg.300'>
            {props.title && (
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {props.title}
              </AlertDialogHeader>
            )}
            {props.description && <AlertDialogBody>{props.description}</AlertDialogBody>}
            <AlertDialogFooter justifyContent='space-between'>
              <Button ref={cancelRef} onClick={props.onClose}>
                {props.cancelText || 'Cancelar'}
              </Button>
              <Button colorScheme='primary' onClick={props.onConfirm} ml={3}>
                {props.confirmText || 'Aceptar'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default useAlertDialog;
