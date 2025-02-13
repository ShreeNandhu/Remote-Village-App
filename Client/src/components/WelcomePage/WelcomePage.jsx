import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import useAuthStore from "../../store/authStore";
import useAdminStore from "../../store/adminStore";

const WelcomePage = () => {
  const { user } = useAuthStore((state) => state);
  const { admin } = useAdminStore((state) => state);

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      px={{ base: 1, md: 0 }}
    >
      <Stack
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        maxWidth={{ base: "100%", md: "900px" }}
        pt={0}
      >
        <Text
          fontSize={{ base: "40px", md: "70px" }}
          fontWeight="bold"
          textAlign="center"
          p={0}
        >
          Welcome
        </Text>
        {(user || admin) && (
          <Text
            fontSize={{ base: "30px", md: "40px" }}
            fontWeight="bold"
            textAlign="center"
          >
            {admin?.username || user?.username}
          </Text>
        )}

        <Text
          textAlign="center"
          fontSize={{ base: "20px", md: "30px" }}
          px={{ base: "10px", md: "0" }}
        >
          Bringing quality learning to every corner of the village.
        </Text>
      </Stack>
    </Flex>
  );
};

export default WelcomePage;