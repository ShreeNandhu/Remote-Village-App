import { Flex, Input, Select, Stack, Text, Button, Alert, AlertIcon } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoIosLogIn } from "react-icons/io";

const UserSignUp = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    district: "",
    board: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null); // State for handling errors
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (inputs.password !== inputs.confirmPassword) {
      setError({ message: "Passwords do not match." });
      setLoading(false);
      return;
    }

    // Additional validation (optional)
    if (!inputs.email.includes("@")) {
      setError({ message: "Please enter a valid email." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputs.username,
          email: inputs.email,
          district: inputs.district,
          board: inputs.board,
          password: inputs.password,
        }),
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred during signup.");
      }

      const data = await response.json();
      console.log("User registered successfully:", data);
      // Optionally clear inputs or redirect
    } catch (error) {
      setError({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Text textAlign="center" fontWeight="bold" color="red.500" fontSize="2xl" mb={4}>
        Sign Up
      </Text>

      <Flex>
        {/* Left Column */}
        <Stack spacing={4} flex={1} pr={2}>
          <Input
            placeholder="Username"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
          <Input
            placeholder="Email"
            type="email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
          <Input
            placeholder="Password"
            type="password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </Stack>

        {/* Right Column */}
        <Stack spacing={4} flex={1} pl={2}>
          <Select
            placeholder="Select Board"
            value={inputs.board}
            onChange={(e) => setInputs({ ...inputs, board: e.target.value })}
          >
            <option value="stateboard">Stateboard</option>
            <option value="cbse">CBSE</option>
          </Select>
          <Input
            placeholder="District"
            value={inputs.district}
            onChange={(e) => setInputs({ ...inputs, district: e.target.value })}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            value={inputs.confirmPassword}
            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
          />
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
