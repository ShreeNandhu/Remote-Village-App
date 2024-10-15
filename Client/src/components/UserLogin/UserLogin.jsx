import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { IoIosLogIn } from "react-icons/io";
import { Link } from "react-router-dom";

const UserLogin = () => {
  return (
    <>
      <Stack gap={4} p={2}>
        <Text
          textAlign="center"
          fontWeight="bold"
          color="red.500"
          fontSize="2xl" // Increased font size for better visibility
        >
          Login
        </Text>
        <Input placeholder="Username" mb={4} />
        <Input placeholder="Password" type="password" mb={4} />
        <Button
          //onClick={handleSubmit}
          leftIcon={<IoIosLogIn />}
          colorScheme="red"
          width="full"
          borderRadius="md"
          mt={4}
          _hover={{
            bg: "white",
            color: "red.500",
            boxShadow: "0px 4px 15px rgba(255, 0, 0, 0.6)",
            transition: "all 0.3s ease",
          }}
        >
          Login
        </Button>
      </Stack>
    </>
  );
};

export default UserLogin;
