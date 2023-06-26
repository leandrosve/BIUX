import { Box, Flex, Icon, SimpleGrid, Tag, Text } from '@chakra-ui/react';
import itemsRoutes from '../layout/sidebar/sidebarItems';
import InstructorCodeDisplay from '../features/instructor/InstructorCodeDisplay';
import { SessionContext } from '../context/SessionProvider';
import { useContext, useMemo } from 'react';
import Role from '../model/user/Role';

const DashboardPage = () => {
  const { session } = useContext(SessionContext);
  const role = useMemo(() => session?.user.role, [session]);
  return (
    <>
      {role == Role.INSTRUCTOR && <InstructorCodeDisplay />}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} gap={4} padding='10vh'>
        {itemsRoutes.map((item) => (
          <div key={item.label}>
            <Box
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
      </SimpleGrid>
    </>
  );
};

export default DashboardPage;
