import {
  Box,
  Flex,
  Input,
  Select,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");
  const [board, setBoard] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    // Perform validation and submit logic
    console.log({
      name,
      email,
      state,
      district,
      board,
      password,
      confirmPassword,
    });
  };

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
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>

          {/* Right Column */}
          <Stack spacing={4} flex={1} pl={2}>
            <Select
              placeholder="Select Board"
              value={board}
              onChange={(e) => setBoard(e.target.value)}
            >
              <option value="stateboard">Stateboard</option>
              <option value="cbse">CBSE</option>
            </Select>
            <Input
              placeholder="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
            <Input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Stack>
        </Flex>

        {/* Sign up button */}
        <Button
          onClick={handleSubmit}
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
        >
          Sign Up
        </Button>

        {/* Link to login page */}
        <Text textAlign="center" mt={4}>
          Already Registered?{" "}
          <Link
            to="/login-user"
            color="red.500"
            fontWeight="bold"
            _hover={{ color: "red.300" }}
            style={{ textDecoration: "inherit" }}
          >
            Login
          </Link>
        </Text>
    </>
  );
};

export default UserLogin;
