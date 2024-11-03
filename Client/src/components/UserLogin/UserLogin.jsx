import { Stack, Text, Input, Button } from "@chakra-ui/react";
import { IoIosLogIn } from "react-icons/io";
import useLogin from "../../hooks/useLogin"; 

const UserLogin = () => {
  const { inputs, error, handleChange, handleSubmit } = useLogin();

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
          placeholder="Email" // Updated placeholder
          mb={4}
          w="auto"
          name="email" // Added name attribute
          value={inputs.email} // Changed to email
          onChange={handleChange} // Using the hook's change handler
        />
        <Input
          placeholder="Password"
          type="password"
          mb={4}
          w="auto"
          name="password" // Added name attribute
          value={inputs.password}
          onChange={handleChange} // Using the hook's change handler
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
          onClick={handleSubmit} // Using the hook's submit handler
        >
          Login
        </Button>
      </Stack>
    </>
  );
};

export default UserLogin;
