import { Box, Flex, Icon, Tag, Text, useMediaQuery } from '@chakra-ui/react';
import itemsRoutes from '../layout/sidebar/sidebarItems';
import InstructorCodeDisplay from '../features/instructor/InstructorCodeDisplay';
import { SessionContext } from '../context/SessionProvider';
import { useContext, useMemo } from 'react';
import Role from '../model/user/Role';
import { useNavigate } from 'react-router-dom';
import { ResponsiveDashBoard } from '../components/ResponsiveDashboard';
import StudentInstructorWidget from '../features/students/StudentInstructorWidget';

const DashboardPage = () => {
  const { session } = useContext(SessionContext);
  const role = useMemo(() => session?.user.role, [session]);
  const navigate = useNavigate();
  const [isLargerThan1510] = useMediaQuery('(max-width: 1510px)');

  const styleFlex = '';
  return (
    <>
      <ResponsiveDashBoard>
        {role == Role.INSTRUCTOR && <InstructorCodeDisplay />}
        {role == Role.STUDENT && <StudentInstructorWidget />}
        <Flex
          flexDirection={{ sm: 'column', md: 'column', lx: 'row' }}
          justifyContent={'center'}
          alignItems={'center'}
          alignContent={'center'}
          padding={'1.5%'}
          gap={'5px'}
        >
          {itemsRoutes.map((item) => (
            <div key={item.label}>
              <Box
                onClick={() => navigate(item.path)}
                transition={' 0.5s all'}
                borderWidth='1px'
                borderRadius='lg'
                overflow='hidden'
                cursor={'pointer'}
                background='bg.300'
                _hover={{
                  boxShadow: '0 4px 4px rgb(169 161 161 / 25%)',
                }}
              >
                <Flex padding={{ base: 4, sm: 6, md: 6 }} color='text.300' gap={2} alignItems='center'>
                  <Tag colorScheme='primary' padding={2} display='flex' alignItems='center' justifyContent='center' bgColor={'transparent'}>
                    <Icon as={item.icon} fill='text.300' boxSize={8} bgColor={'transparent'} />
                  </Tag>
                  <Text as='h1'>{item.label}</Text>
                </Flex>
              </Box>
            </div>
          ))}
        </Flex>
      </ResponsiveDashBoard>
    </>
  );
};

export default DashboardPage;
