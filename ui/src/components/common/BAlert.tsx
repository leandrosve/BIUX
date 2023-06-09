import { Alert, AlertDescription, AlertIcon, AlertProps, AlertTitle, CloseButton, ScaleFade } from '@chakra-ui/react';
import { ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

interface Props extends AlertProps {
  hasIcon?: boolean;
  closable?: boolean;
  autoFocus?: boolean;
  description?: string | ReactNode;
}

const BAlert = ({ hasIcon = true, closable, autoFocus, title, description, ...rest }: Props) => {
  const ref = useRef<HTMLDivElement>();
  const [hidden, setHidden] = useState(true);

  const empty = useMemo(() => !title && !description, [title, description]);

  const onClose = () => {
    setHidden(true);
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
      <Alert {...rest} ref={ref} tabIndex={-1}>
        {hasIcon && <AlertIcon />}
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
        {closable && <CloseButton alignSelf='flex-start' position='relative' right={-1} top={-1} onClick={onClose} />}
      </Alert>
    </ScaleFade>
  );
};

export default BAlert;
