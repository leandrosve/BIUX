import { useEffect, useState } from 'react';
import ResponsiveCard from '../../components/common/ResponsiveCard';
import StudentService from '../../services/api/StudentService';
import { User } from '../../model/user/User';
import { Flex, Heading, Icon, IconButton, Text, Tooltip } from '@chakra-ui/react';
import BAvatar from '../../components/common/BAvatar';
import { ChatIcon } from '../../components/common/Icons';
import SkeletonWrapper from '../../components/common/SkeletonWrapper';

const StudentInstructorWidget = () => {
  const [instructor, setInstructor] = useState<User>();
  const retrieveInstructor = async () => {
    const res = await StudentService.me();
    if (res.hasError) return;
    setInstructor(res.data.instructor);
  };
  useEffect(() => {
    retrieveInstructor();
  }, []);
  return (
    <ResponsiveCard marginTop={5} alignItems='start' gap={3} paddingX={[2, 6]} minWidth='fit-content' minHeight='auto' defaultWidth='400px' defaultHeight='auto'>
      <SkeletonWrapper loading={!instructor} heights={[30, '80px']} width='100%' repeat={2}>
        <Flex direction='column' gap={2} alignSelf='stretch'>
          <Text textTransform='uppercase' fontSize='xs' fontWeight='bold' color='primary.600' _dark={{ color: 'primary.200' }}>
            tu instructor
          </Text>
          <Flex gap={4} justifyContent='space-between' alignItems='center'>
            <Flex gap={4} alignItems='center'>
              <BAvatar boxSize={['45px', '60px']} name={`${instructor?.firstName} ${instructor?.lastName}`} boxShadow='xs' />
              <Flex direction='column'>
                <Heading size='md'>
                  {instructor?.firstName} {instructor?.lastName}
                </Heading>
                <Heading size='sm' as='h3' fontWeight='medium'>
                  {instructor?.email}
                </Heading>
              </Flex>
            </Flex>
            <Tooltip label='Por el momento esta funcionalidad no está disponible' hasArrow>
              <IconButton
                icon={<Icon as={ChatIcon} boxSize={5} color='primary.600' _dark={{ color: 'primary.200' }} />}
                variant='ghost'
                background='whiteAlpha.100'
                isDisabled
                borderRadius='50%'
                display='flex'
                aria-label={'Enviar mensaje a mi instructor. No disponible por el momento'}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </SkeletonWrapper>
    </ResponsiveCard>
  );
};

export default StudentInstructorWidget;
