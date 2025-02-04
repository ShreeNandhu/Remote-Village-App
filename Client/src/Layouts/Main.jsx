import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const Main = ({ main , sidebar }) => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/' && location.pathname !== '/about' && location.pathname !== '/profile';


  return (
    <Flex
      direction="row"
      flex="1" 
      overflowY="auto" 
    >
      {showSidebar && ( 
      <Box width="160px" bg="#FBF8DD">
         <Sidebar sidebar={sidebar} />
      </Box>
      )}

      {/* Main content */}
      <Box flex="1" bg="white" p="2" overflowY="none">
        {main}
      </Box>
    </Flex>
  );
};

export default Main;
