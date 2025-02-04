import {
  Stack,
  Text,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { IoIosLogIn } from "react-icons/io";
import useAdminLogin from "../../hooks/useAdminLogin";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const AdminLogin = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { loading, error, login } = useAdminLogin(); // Using the useLogin hook
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Stack gap={4} p={2}>
      <Text textAlign="center" fontWeight="bold" color="blue.500" fontSize="2xl">
        Admin Login
      </Text>

      {/* Error Handling */}
      {/* Error Alert when error occurs */}
      {error && error.code === "auth/invalid-credential" && (
        <Alert status="error">
          <AlertIcon />
          Password is wrong. Please try again.
        </Alert>
      )}

      {error && error.code !== "auth/invalid-credential" && (
        <Alert status="error">
          <AlertIcon />
          {error.message || "An error occurred. Please try again."}
        </Alert>
      )}

      {/* Email Input */}
      <Input
        placeholder="Email"
        mb={4}
        w="auto"
        name="email"
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />

      {/* Password Input */}
      <InputGroup>
        <Input
          placeholder="Password"
          fontSize={14}
          type={showPassword ? "text" : "password"}
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
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

      {/* Login Button */}
      <Button
        leftIcon={<IoIosLogIn />}
        colorScheme="blue"
        width="full"
        borderRadius="md"
        mt={4}
        _hover={{
          bg: "white",
          color: "blue.500",
          boxShadow: "0px 4px 15px rgba(0, 0, 255, 0.6)",
          transition: "all 0.3s ease",
        }}
        isLoading={loading}
        onClick={() => login(inputs)} // Pass the inputs to the login function
      >
        Login
      </Button>
    </Stack>
  );
};

export default AdminLogin;
