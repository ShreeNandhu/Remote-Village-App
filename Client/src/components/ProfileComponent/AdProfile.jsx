import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useALogout from "../../hooks/useALogout"; // Ensure the hook is imported
import useUserData from "../../hooks/useUserData"; // Import the custom hook
import useAdminStore from "../../store/adminStore";

const AdProfile = () => {
  const { admin } = useAdminStore((state) => state);
  const { handleLogout } = useALogout(); // Destructure handleLogout from the hook
  const { userCount, userPapers, error } = useUserData(); // Get data from the custom hook

  // Check if admin exists and has a username
  const username = admin?.username || "No username found";
  const title = `Mr./Mrs. ${username}`;

  // Fetch the total number of students and total questions created by the admin
  const totalStudents = userCount || 0; // Use the userCount from the custom hook
  const totalQuestions = userPapers.length || 0; // Use the length of papers created by the user

  useEffect(() => {
    // Additional logic if needed when data is fetched or error occurs
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [error]);

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
      <Text fontSize="6xl" fontWeight="bold" color="red.500" textAlign="center" mb={4}>
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
          bg="blue.500" // Blue background for the total students box
          color="white"
          w="80%"
          p={8}
          borderRadius="md"
          boxShadow="lg"
          textAlign="center"
        >
          <Text fontSize="2xl" fontWeight="bold">Total User Strength</Text>
          <Text fontSize="4xl" mt={4}>{totalStudents}</Text>
        </Box>

        <Box
          bg="red.600" // Darker red background for the total questions box
          color="white"
          w="80%"
          p={8}
          borderRadius="md"
          boxShadow="lg"
          textAlign="center"
        >
          <Text fontSize="2xl" fontWeight="bold">Total Questions Created</Text>
          <Text fontSize="4xl" mt={4}>{totalQuestions}</Text>
        </Box>
      </Flex>

      {/* Logout Button */}
      <Button
        position="absolute"
        bottom="20px"
        right="20px"
        colorScheme="red"
        onClick={handleLogout} // Call handleLogout directly
      >
        Logout
      </Button>
    </Box>
  );
};

export default AdProfile;
