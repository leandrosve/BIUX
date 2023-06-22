import {AbsoluteCenter, As, Box, Center, Flex, Icon, SimpleGrid, Tag, Text } from "@chakra-ui/react";
import itemsRoutes from "../layout/sidebar/sidebarItems";

const mystyle:React.CSSProperties = {
  "display":"flex","flexDirection":"column","alignItems":"center", "justifyContent":"center",
  "minHeight":"50vh", "marginLeft":"10%",

};
const hoverBoxStyle:React.CSSProperties={
  "transition":"0px 1px 6px 0px #ccc;"
}
const DashboardPage = () => {
  return (
    <div style={mystyle} >
   
          <SimpleGrid columns={{ base: 1, sm:2,md: 3,xl:4}} gap={4} >
                {
                  itemsRoutes.map(item=> (
                  <div key={item.label} >
                      <Box 
                          transition={' 0.5s all'}
                          borderWidth='1px' borderRadius='lg' overflow='hidden' cursor={"pointer"} background='bg.300' 
                         _hover={{
                           
                            boxShadow:'0 4px 4px rgb(169 161 161 / 25%)'
                            
                            }}
                      >
                        <Flex
                            padding={{ base: 4, sm:6,md:6}}
                            color='text.300'
                            gap={2}
                            alignItems='center'
                            
                        >
                          <Tag
                           
                            
                            padding={2}
                            
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            bgColor={"transparent"}
                          >
                            <Icon as={item.icon} fill='text.300' boxSize={8} bgColor={"transparent"} />
                          </Tag>
                              <Text as='h1'>{item.label}</Text>
                          </Flex>
                        </Box>
                                  
                  </div>
                        ))
                  }
          </SimpleGrid>
    </div>
  );
};

export default DashboardPage;