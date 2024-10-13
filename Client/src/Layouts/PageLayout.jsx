import React from "react";
import { Flex } from "@chakra-ui/react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const PageLayout = ({ main, sidebar }) => {
  return (
    <Flex
      w={"100%"} 
      direction="column"
      minHeight="100vh" // Full height of the viewport
    >
      <Header />
      <Flex
        flex="1"        
        direction="column" // Ensure children stack vertically
      >
        <Main main={main} sidebar={sidebar}/>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default PageLayout;
