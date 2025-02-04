import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useALogout from "../../hooks/useALogout"; // Ensure the hook is imported // Import the custom hook
import useAuthStore from "../../store/authStore"; // Import your auth store

const UsProfile = () => {
  // Destructure user from auth store instead of admin store
  const { user } = useAuthStore((state) => state);
  const { handleLogout } = useALogout(); // Destructure handleLogout from the hook
  //   const { userCount, userPapers, error } = useUserData(); // Get data from the custom hook

  // Ensure user exists and has a username (use user from auth store)
  const username = user?.username || "No username found"; // Check if user is available
  const title = `Mr./Mrs. ${username}`;

  // Fetch the total number of students and total questions created by the user
  // Use the length of papers created by the user

  //   useEffect(() => {
  //     // Additional logic if needed when data is fetched or error occurs
  //     if (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }, [error]);

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
        color="red.500"
        textAlign="center"
        mb={4}
      >
        Welcome
      </Text>

      {/* Username - Centered */}
      <Center mb={8}>
        <Text fontSize="2xl" fontWeight="bold" color="black">
          {username}
        </Text>
      </Center>

      {/* Categories - Total Students and Questions */}
      <Flex direction="row" spacing={8} w="800px" align="center" gap={2}>
        <Box
          bg="linear-gradient(to right, #2196f3, #00bcd4)"
          // Gradient background from blue to lighter blue
          color="white"
          w="50%"
          p={5}
          borderRadius="xl" // Use xl border radius for smoother rounded corners
          boxShadow="lg" // Larger shadow for a more elevated effect
          textAlign="center"
          transition="transform 0.3s ease, box-shadow 0.3s ease" // Smooth animation on hover
          _hover={{ // Slightly scale up on hover
            boxShadow: "0 10px 23px rgba(0, 0, 200, 0.5)", // Add a more prominent shadow on hover
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
          bg="linear-gradient(to left, #2196f4, #00bcd4)" // Gradient background from blue to lighter blue
          color="white"
          w="50%"
          p={5}
          borderRadius="xl" // Use xl border radius for smoother rounded corners
          boxShadow="lg" // Larger shadow for a more elevated effect
          textAlign="center"
          transition="transform 0.3s ease, box-shadow 0.3s ease" // Smooth animation on hover
          _hover={{ // Slightly scale up on hover
            boxShadow: "0 10px 23px rgba(0, 0, 200, 0.5)", // Add a more prominent shadow on hover
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
        onClick={handleLogout} // Call handleLogout directly
      >
        Logout
      </Button>
    </Box>
  );
};

export default UsProfile;
