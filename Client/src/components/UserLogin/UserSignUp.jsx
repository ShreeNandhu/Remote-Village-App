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

const UserSignUp = () => {
  const { inputs, error, loading, handleChange, handleSubmit } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <Text
        textAlign="center"
        fontWeight="bold"
        color="red.500"
        fontSize="2xl"
        mb={4}
      >
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
        onClick={handleSubmit}
        leftIcon={<IoIosLogIn />}
        colorScheme="red"
        width="full"
        borderRadius="md"
        mt={4}
        isLoading={loading} // Show loading state on button
        _hover={{
          bg: "white",
          color: "red.500",
          boxShadow: "0px 4px 15px rgba(255, 0, 0, 0.6)",
          transition: "all 0.3s ease",
        }}
      >
        Sign Up
      </Button>
    </>
  );
};

export default UserSignUp;
