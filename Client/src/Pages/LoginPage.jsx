import React from "react";
import UserLogin from "../components/UserLogin/UserLogin";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      bgColor="#FBF8DD"
    >
      <Box
        bgColor="white"
        p={6} // Increased padding for better spacing
        boxShadow="lg"
        borderRadius="md"
        w={400}
        h={350}
      >
        <UserLogin />

        <Text textAlign="center" mt={4}>
          Don't Have an Account?{" "}
          <Link
            to="/signup-user"
            color="red.500"
            fontWeight="bold"
            _hover={{ color: "red.300" }}
          >
            Sign Up
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginPage;
