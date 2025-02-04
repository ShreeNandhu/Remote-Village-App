import React, { useState } from "react";
import {
  Flex,
  Stack,
  Input,
  Select,
  Button,
  Text,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { IoIosLogIn } from "react-icons/io"; // Make sure you have this icon imported
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import GoogleAuth from "./GoogleAuth";
import useAdminSignUp from "../../hooks/useAdminSignUp";

const AdminSignUp = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const { error, loading, signup } = useAdminSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <Text
        textAlign="center"
        fontWeight="bold"
        color="blue.500"
        fontSize="2xl"
        mb={4}
      >
       Admin Sign Up
      </Text>

      <Flex>
        {/* Left Column */}
        <Stack spacing={4} flex={1} pr={2}>
          <Input
            placeholder="Username"
            name="username"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
          
          <InputGroup>
            <Input
              placeholder="Password"
              fontSize={14}
              type={showPassword ? "text" : "password"}
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              name="password"
            />
            <InputRightElement h="full">
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Stack>

        {/* Right Column */}
        <Stack spacing={4} flex={1} pl={2}>
        <Input
            placeholder="Email"
            type="email"
            name="email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />

          <InputGroup>
            <Input
              placeholder="Confirm Password"
              fontSize={14}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
            <InputRightElement h="full">
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Stack>
      </Flex>

      {/* Error Alert */}
      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4} mt={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}

      {/* Sign up button */}
      <Button
        onClick={() => signup(inputs)}
        leftIcon={<IoIosLogIn />}
        colorScheme="blue"
        width="full"
        borderRadius="md"
        mt={4}
        isLoading={loading} // Show loading state on button
        _hover={{
          bg: "white",
          color: "blue.500",
          boxShadow: "0px 4px 15px rgba(0, 0, 255, 0.6)",
          transition: "all 0.3s ease",
        }}
      >
        Sign Up
      </Button>
      <GoogleAuth/>
    </>
  );
};

export default AdminSignUp;
