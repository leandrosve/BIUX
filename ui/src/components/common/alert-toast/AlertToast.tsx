import { Alert, AlertIcon, AlertProps, Box, Button, Flex, Icon, useMediaQuery } from '@chakra-ui/react';
import { useRef, useEffect } from 'react';

import { CloseIcon } from '../Icons';
import './alertToast.css'

interface Props extends AlertProps {
  duration?: number;
  hasIcon?: boolean;
  hasProgress?: boolean;
  onClose?: () => void;
  isClosable?: boolean;
}

const AlertToast = ({ duration = 0, hasIcon, hasProgress, children, colorScheme = 'primary', isClosable, onClose, ...rest }: Props) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [mobile] = useMediaQuery('(max-width: 500px)', { ssr: false, fallback: false });


  const onEnter = () => {
    if (!progressRef?.current) return;
    const classList = progressRef.current.classList;
    classList.remove('toast-progress-anim');
    classList.add('toast-progress-fullwidth');
  };

  const onPointerLeave = () => {
    if (!progressRef?.current) return;
    const classList = progressRef.current.classList;
    classList.add('toast-progress-anim');
    classList.remove('toast-progress-fullwidth');
  };

  useEffect(() => {
    if (!progressRef?.current || !hasProgress || !duration) return;
    progressRef.current.style.setProperty('--toast-progress-duration', `${duration}ms`);
    progressRef.current.classList.add('toast-progress-anim');
  }, [duration, hasProgress, progressRef]);
  return (
    <Flex direction={'column'} onPointerEnter={onEnter} onPointerLeave={onPointerLeave}>
      <Box bgColor={'gray.700'} overflow='hidden' borderTopRadius={5} borderBottomRadius={hasProgress ? 0 : 5}>
        <Alert colorScheme={colorScheme} {...rest}>
          {hasIcon && !mobile && <AlertIcon />}
          {children}
          {isClosable && (
            <Button
              colorScheme={colorScheme}
              variant='ghost'
              alignSelf='flex-start'
              position='relative'
              size='sm'
              right={-1}
              top={-1}
              onClick={onClose}
            >
              <Icon as={CloseIcon} w={2} h={2} />
            </Button>
          )}
        </Alert>
      </Box>
      {duration && hasProgress && (
        <>
          <Flex width='auto' height={.5} background='whiteAlpha.300'>
            <Flex ref={progressRef} background={`${colorScheme}.200`} height={'100%'}></Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default AlertToast;
