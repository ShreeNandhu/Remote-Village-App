import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const Main = ({ main , sidebar }) => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/';
  return (
    <Flex
      direction="row"
      flex="1" // Ensure Main takes available height between Header and Footer
      overflowY="auto" // Enable scrolling for content overflow
    >
      {showSidebar && ( 
      <Box width="160px" bg="#FFEEAD">
         <Sidebar sidebar={sidebar} />
      </Box>
      )}

      {/* Main content */}
      <Box flex="1" bg="#FBF8DD" p="4" overflowY="auto">
        {main}
      </Box>
    </Flex>
  );
};

export default Main;
