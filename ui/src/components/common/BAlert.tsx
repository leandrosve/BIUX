import { Alert, AlertDescription, AlertIcon, AlertProps, AlertTitle, CloseButton, ScaleFade } from '@chakra-ui/react';
import { ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

interface Props extends AlertProps {
  hasIcon?: boolean;
  closable?: boolean;
  autoFocus?: boolean;
  description?: string | ReactNode;
  onClose?: () => void;
}

const BAlert = ({ hasIcon = true, closable, autoFocus, title, description, onClose, size, ...rest }: Props) => {
  const ref = useRef<HTMLDivElement>();
  const [hidden, setHidden] = useState(true);

  const empty = useMemo(() => !title && !description, [title, description]);

  const handleClose = () => {
    setHidden(true);
    onClose?.();
  };

  useEffect(() => {
    setHidden(empty);
  }, [empty]);

  useLayoutEffect(() => {
    if (!hidden && autoFocus) {
      ref.current?.focus();
    }
  }, [hidden, autoFocus]);

  if (hidden) return null;

  return (
    <ScaleFade initialScale={0.9} in={true}>
      <Alert {...rest} ref={ref} tabIndex={-1} paddingY={size == 'sm' ? '3px' : '20px'} paddingRight={closable ? '40px' : undefined} borderRadius='md'>
        {hasIcon && <AlertIcon boxSize={size == 'sm' ? '20px' : '20px'} />}
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
        {closable && <CloseButton size={size} position='absolute' right={'4px'} top='4px' onClick={handleClose} />}
      </Alert>
    </ScaleFade>
  );
};

export default BAlert;
