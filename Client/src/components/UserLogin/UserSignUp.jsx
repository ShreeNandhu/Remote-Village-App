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
import useSignUp from "../../hooks/useSignUp";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import GoogleAuth from "./GoogleAuth";

const UserSignUp = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
    district: "",
    board: "",
    confirmPassword: "",
  });

  const { error, loading, signup } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle change of input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (signup)
  const handleSignUp = () => {
    if (inputs.password !== inputs.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    signup(inputs); // Call the signup function from the hook
  };

  return (
    <>
      <Text textAlign="center" fontWeight="bold" color="green.500" fontSize="2xl" mb={4}>
        Sign Up
      </Text>

      <Flex>
        {/* Left Column */}
        <Stack spacing={4} flex={1} pr={2}>
          <Input
            placeholder="Username"
            name="username"
            value={inputs.username}
            onChange={handleChange}
          />
          <Input
            placeholder="Email"
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
          />

          <InputGroup>
            <Input
              placeholder="Password"
              fontSize={14}
              type={showPassword ? "text" : "password"}
              value={inputs.password}
              onChange={handleChange}
              name="password"
            />
            <InputRightElement h="full">
              <Button variant="ghost" size="sm" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Stack>

        {/* Right Column */}
        <Stack spacing={4} flex={1} pl={2}>
          <Select
            placeholder="Select Board"
            name="board"
            value={inputs.board}
            onChange={handleChange}
          >
            <option value="stateboard">Stateboard</option>
            <option value="cbse">CBSE</option>
          </Select>
          <Input
            placeholder="District"
            name="district"
            value={inputs.district}
            onChange={handleChange}
          />
          <InputGroup>
            <Input
              placeholder="Confirm Password"
              fontSize={14}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleChange}
            />
            <InputRightElement h="full">
              <Button
                variant="ghost"
                size="sm"
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

      {/* Sign Up button */}
      <Button
        onClick={handleSignUp}
        leftIcon={<IoIosLogIn />}
        colorScheme="green"
        width="full"
        borderRadius="md"
        mt={4}
        isLoading={loading} // Show loading state on button
        _hover={{
          bg: "white",
          color: "green.500",
          boxShadow: "0px 4px 15px rgba(0, 255, 0, 0.6)",
          transition: "all 0.3s ease",
        }}
      >
        Sign Up
      </Button>

      {/* Google Authentication Component */}
      <GoogleAuth />
    </>
  );
};

export default UserSignUp;
