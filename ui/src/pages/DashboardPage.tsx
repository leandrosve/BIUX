import { Flex, Grid, GridItem, Heading, Icon, List, ListItem, Tag, Text } from '@chakra-ui/react';
import itemsRoutes from '../layout/sidebar/sidebarItems';
import InstructorCodeDisplay from '../features/instructor/InstructorCodeDisplay';
import { SessionContext } from '../context/SessionProvider';
import { useContext, useMemo } from 'react';
import Role from '../model/user/Role';
import StudentInstructorWidget from '../features/students/StudentInstructorWidget';
import StudentRoutineList from '../features/students/StudentRoutineList';
import ResponsiveCard from '../components/common/ResponsiveCard';
import InstructorWelcome from '../features/instructor/InstructorWelcome';
import LinkButton from '../components/common/LinkButton';

const DashboardPage = () => {
  const { session } = useContext(SessionContext);
  const role = useMemo(() => session?.user.role, [session]);
  const sidebarItems = useMemo(() => {
    return itemsRoutes.filter((item) => !item.role || item.role == session?.user.role);
  }, [itemsRoutes, session]);

  return (
    <Flex marginTop={{ base: 2, lg: 4 }} alignItems='stretch' justifyContent='stretch' direction='column' grow={1} width='100%' padding={2}>
      {role == Role.INSTRUCTOR && <InstructorWelcome />}
      {role == Role.INSTRUCTOR && (
        <>
          <Heading size='md' marginLeft={{ base: 1, lg: 4 }}>
            Panel de instructor
          </Heading>
          <InstructorCodeDisplay />
        </>
      )}
      {role == Role.STUDENT && (
        <>
          <StudentRoutineList />
          <StudentInstructorWidget />
        </>
      )}
      <Heading size='md' marginY={4} marginLeft={{ base: 1, lg: 4 }}>
        Herramientas
      </Heading>
      <ResponsiveCard background='transparent' boxShadow='none' defaultWidth='1300px' padding={0} paddingTop={0}>
        <Grid as={List} templateColumns={{ base: 'repeat(1, 5fr)', sm: 'repeat(2, 3fr)', xl: 'repeat(5, 1fr)' }} gap={4}>
          {sidebarItems.map((item) => (
            <GridItem key={item.path} minHeight='130px' width='100%' as={ListItem}>
              <LinkButton
                to={item.path}
                className='selectable-item'
                borderWidth='1px'
                borderRadius='lg'
                overflow='hidden'
                background='bg.300'
                width='100%'
                height='100%'
              >
                <Flex padding={{ base: 4, sm: 6, md: 6 }} gap={3} direction='column' alignItems='center'>
                  <Tag colorScheme='primary' padding={2} display='flex' alignItems='center' justifyContent='center' borderRadius='full'>
                    <Icon as={item.icon} boxSize={8} bgColor={'transparent'} />
                  </Tag>
                  <Text as='span' fontSize='lg'>
                    {item.label}
                  </Text>
                </Flex>
              </LinkButton>
            </GridItem>
          ))}
        </Grid>
      </ResponsiveCard>
    </Flex>
  );
};

export default DashboardPage;
