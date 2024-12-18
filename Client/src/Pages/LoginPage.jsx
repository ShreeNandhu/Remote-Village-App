import { useState } from "react";
import UserLogin from "../components/UserLogin/UserLogin";
import UserSignUp from "../components/UserLogin/UserSignUp";
import { Box, Button, Flex, VStack, Text } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io"; // Import close icon
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and sign-up

  // Handle the close button action (navigate to the homepage or any desired route)
  const handleClose = () => {
    navigate("/");
    console.log("Close button clicked");
  };

  // Function to toggle between Login and Sign Up
  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

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
        p={8} // Increased padding for better spacing
        boxShadow="lg"
        borderRadius="md"
        w={["90%", "500px"]} // Responsive width (90% for mobile, 500px for larger screens)
        h={"auto"} // Adjust height to fit content dynamically
        position="relative" // Set position to relative for absolute positioning of close button
      >
        {/* Close Button */}
        <Button
          onClick={handleClose}
          position="absolute"
          top={4}
          right={4}
          size="lg"
          variant="ghost"
          color="red.500"
          p={0}
        >
          <IoMdClose size="24px" /> {/* Adjust icon size for better UI */}
        </Button>

        {/* Content: Sign Up / Login Form */}
        <VStack spacing={6} mt={4}>
          {isLogin ? <UserLogin /> : <UserSignUp />}
        </VStack>

        {/* Toggle Between Login and Sign Up */}
        <Flex alignItems="center" justifyContent="center" mt={6}>
          <Text mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Text>
          <Text
            as="span" // Use span instead of Link to avoid route navigation
            onClick={toggleForm} // Toggle the form on click
            color={"blue.500"}
            cursor={"pointer"}
            _hover={{
              textDecoration: "underline",
              color: "blue.600",
            }}
          >
            {isLogin ? "Sign up" : "Log in"}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default LoginPage;
