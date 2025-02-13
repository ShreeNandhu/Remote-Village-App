import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import useULogout from "../../hooks/useULogout"; // Import custom logout hook
import useAuthStore from "../../store/authStore"; // Import authentication store

const UsProfile = () => {
  // Get user details and logout function from Zustand store
  const user = useAuthStore((state) => state.user); // Ensure user is fetched
  const logoutUser = useAuthStore((state) => state.logout);
  const { handleLogout } = useULogout();

  // Ensure user exists and has a username
  const username = user?.username || "No username found";
  const title = `Mr./Mrs. ${username}`;

  // Logout handler
  const handleClickLogout = () => {
    handleLogout(); // Custom logout logic
    logoutUser(); // Zustand store logout
  };

  return (
    <Box
      position="relative"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      p={6}
    >
      {/* Welcome Text */}
      <Text fontSize="6xl" fontWeight="bold" color="blue.400" textAlign="center" mb={4}>
        Welcome
      </Text>

      {/* Username - Centered */}
      <Center mb={8}>
        <Text fontSize="2xl" fontWeight="bold" color="black">
          {title}
        </Text>
      </Center>

      {/* Categories - Total Students and Questions */}
      <Flex direction="row" spacing={8} w="800px" align="center" gap={2}>
        <Box
          bg="linear-gradient(to right, #2196f3, #00bcd4)"
          color="white"
          w="50%"
          p={5}
          borderRadius="xl"
          boxShadow="lg"
          textAlign="center"
          transition="transform 0.3s ease, box-shadow 0.3s ease"
          _hover={{
            boxShadow: "0 10px 23px rgba(0, 0, 200, 0.5)",
          }}
        >
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            Your Grade
          </Text>
          <Text fontSize="5xl" fontWeight="bold" mt={4}>
            A+
          </Text>
        </Box>

        <Box
          bg="linear-gradient(to left, #2196f4, #00bcd4)"
          color="white"
          w="50%"
          p={5}
          borderRadius="xl"
          boxShadow="lg"
          textAlign="center"
          transition="transform 0.3s ease, box-shadow 0.3s ease"
          _hover={{
            boxShadow: "0 10px 23px rgba(0, 0, 200, 0.5)",
          }}
        >
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            Need To Improve
          </Text>
          <Text fontSize="5xl" fontWeight="bold" mt={4}>
            Chemistry
          </Text>
        </Box>
      </Flex>

      {/* Logout Button */}
      <Button
        position="absolute"
        bottom="20px"
        right="20px"
        colorScheme="red"
        onClick={handleClickLogout} // Corrected function call
      >
        Logout
      </Button>
    </Box>
  );
};

export default UsProfile;
