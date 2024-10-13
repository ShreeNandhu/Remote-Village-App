import { Flex } from "@chakra-ui/react";

const Sidebar = ({ sidebar }) => {
  return (
      <Flex 
        direction="column" 
        alignItems={"center"}       
      >
        {sidebar}
      </Flex>
  );
};

export default Sidebar;

