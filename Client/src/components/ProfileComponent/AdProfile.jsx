import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import useUserData from "../../hooks/useUserData";
import useALogout from "../../hooks/useALogout"; // Corrected import for logout hook
import useAdminStore from "../../store/adminStore";

const UsProfile = () => {
  // Get admin details and logout function from Zustand store
  const user = useAdminStore((state) => state.admin);
  const { handleLogout } = useALogout(); // Using correct logout hook
  const { userCount, userPapers, error } = useUserData();

  // Ensure user exists and has a username
  const username = user?.username || "No username found";
  const title = `Mr./Mrs. ${username}`;
  const totalStudents = userCount || 0; // Use the userCount from the custom hook
  const totalQuestions = userPapers.length || 0;

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
      <Text
        fontSize="6xl"
        fontWeight="bold"
        color="blue.400"
        textAlign="center"
        mb={4}
      >
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
            Total Students
          </Text>
          <Text fontSize="5xl" fontWeight="bold" mt={4}>
            {totalStudents}
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
            Total Questions Created
          </Text>
          <Text fontSize="5xl" fontWeight="bold" mt={4}>
            {totalQuestions}
          </Text>
        </Box>
      </Flex>

      {/* Logout Button */}
      <Button
        position="absolute"
        bottom="20px"
        right="20px"
        colorScheme="red"
        onClick={handleLogout} // Directly calling the function
      >
        Logout
      </Button>
    </Box>
  );
};

export default UsProfile;
