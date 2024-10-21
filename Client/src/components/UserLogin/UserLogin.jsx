import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import axios from "axios"; // Import axios for making API requests

const UserLogin = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/loginuser", inputs);
      console.log("Login successful, token:", response.data.token);
      // You can save the token to localStorage and redirect the user
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Stack gap={4} p={2}>
        <Text
          textAlign="center"
          fontWeight="bold"
          color="red.500"
          fontSize="2xl"
        >
          Login
        </Text>
        {error && <Text color="red.500">{error}</Text>}
        <Input
          placeholder="Username"
          mb={4}
          w="auto"
          value={inputs.username}
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        />
        <Input
          placeholder="Password"
          type="password"
          mb={4}
          w="auto"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <Button
          leftIcon={<IoIosLogIn />}
          colorScheme="red"
          width="full"
          borderRadius="md"
          mt={4}
          _hover={{
            bg: "white",
            color: "red.500",
            boxShadow: "0px 4px 15px rgba(255, 0, 0, 0.6)",
            transition: "all 0.3s ease",
          }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Stack>
    </>
  );
};

export default UserLogin;
