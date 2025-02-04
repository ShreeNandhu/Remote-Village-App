import { useState } from "react";
import UserLogin from "../components/UserLogin/UserLogin";
import UserSignUp from "../components/UserLogin/UserSignUp";
import { Box, Button, Flex, VStack, Text } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io"; // Import close icon
import { useNavigate } from "react-router-dom";
import AdminLogin from "../components/AdminLogin/AdminLogin";
import AdminSignUp from "../components/AdminLogin/AdminSignUp";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isUserLogin, setIsUserLogin] = useState(true);
  const [activeRole, setActiveRole] = useState("User");
  const [isAdminLogin, setIsAdminLogin] = useState(true);

  // Handle the close button action (navigate to the homepage or any desired route)
  const handleClose = () => {
    navigate("/");
  };


  const renderForm = () => {
    if (activeRole === "User") {
      return isUserLogin ? <UserLogin /> : <UserSignUp />;
    } else if (activeRole === "Admin") {
      return isAdminLogin ? <AdminLogin /> : <AdminSignUp />;
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      bgColor={activeRole === "User" ? "green.50" : "blue.50"}
    >
      <Flex
        position="absolute"
        top={4}
        left="50%"
        transform="translateX(-50%)"
        gap={4} // Space between buttons
      >
        <Button
          size="lg"
          bg={activeRole === "User" ? "green.500" : "white"} // Conditional background color
          color={activeRole === "User" ? "white" : "green.500"} // Conditional text color
          onClick={() => setActiveRole("User")}
          _hover={{
            bg: "white",
            color: "green.500",
            boxShadow: "0px 4px 15px rgba(0, 255, 0, 0.6)",
            transition: "all 0.3s ease",
          }}
        >
          User
        </Button>

        <Button
          size="lg"
          bg={activeRole === "Admin" ? "blue.500" : "white"} // Conditional background color
          color={activeRole === "Admin" ? "white" : "blue.500"} // Conditional text color
          onClick={() => setActiveRole("Admin")}
          _hover={{
            bg: "white",
            color: "blue.500",
            boxShadow: "0px 4px 15px rgba(0, 0, 255, 0.6)",
            transition: "all 0.3s ease",
          }}
        >
          Admin
        </Button>
      </Flex>
      <Box
        bgColor="white"
        p={8}
        boxShadow="lg"
        borderRadius="md"
        w={["90%", "500px"]}
        h={"auto"}
        position="relative"
        mt={10}
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

        {/* Render Content Based on Active Role */}
        <VStack spacing={6} mt={4}>
          {renderForm()}
        </VStack>

        {/* Toggle Between Login and Sign Up */}
        <Flex alignItems="center" justifyContent="center" mt={6}>
          <Text mx={2} fontSize={14}>
            {activeRole === "User"
              ? isUserLogin
                ? "Don't have an account?"
                : "Already have an account?"
              : isAdminLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </Text>
          <Text
            as="span"
            onClick={() => {
              if (activeRole === "User") {
                setIsUserLogin(!isUserLogin);
              } else {
                setIsAdminLogin(!isAdminLogin);
              }
            }}
            color={"blue.500"}
            cursor={"pointer"}
            _hover={{
              textDecoration: "underline",
              color: "blue.600",
            }}
          >
            {activeRole === "User"
              ? isUserLogin
                ? "Sign up"
                : "Log in"
              : isAdminLogin
              ? "Sign up"
              : "Log in"}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default LoginPage;
