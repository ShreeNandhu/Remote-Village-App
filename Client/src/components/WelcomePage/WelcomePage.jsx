import { InfoIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import React from "react";

const WelcomePage = () => {
  return (
    <Flex
      height="full" // Makes sure the Flex container takes the full viewport height
      alignItems="center"
      justifyContent="center"
    >
      <Stack
          gap={2}
          m={15}
          display="flex" // Enables flex behavior for content inside the Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          maxWidth={"500px"}
        >
          <Text fontSize="90px" fontWeight="bold">
            Welcome
          </Text>
          <Text fontSize="20px" fontWeight="bold">
            To Our Website Students
          </Text>
          <Flex gap={4} mt={4}>
          <Button aria-label="10th" size="lg" w="100px" colorScheme="red">10th</Button>
          <Button aria-label="12th" size="lg" w="100px" colorScheme="red">12th</Button>
        </Flex>
        <Text textAlign={"center"}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        </Text>
        </Stack>
    </Flex>
  );
};

export default WelcomePage;
