import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuthStore from "../../store/authStore";
import useAdminStore from "../../store/adminStore";

const WelcomePage = () => {
  const { user } = useAuthStore((state) => state);
  const { admin } = useAdminStore((state) => state);
  const selectedStandard = useAuthStore((state) => state.selectedStandard);
  const setStandard = useAuthStore((state) => state.setStandard); // Ensure you get the setStandard function from your store

  useEffect(() => {
    if (!selectedStandard) {
      setStandard(null);
    }
  }, [selectedStandard, user, setStandard]);

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
          fontSize={{ base: "50px", md: "90px" }}
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

        {user && !admin && !selectedStandard && (
          <Flex
            gap={4}
            mt={4}
            direction={{ base: "column", sm: "row" }}
            align="center"
            justify="center"
          >
            <Button
              aria-label="10th"
              size="lg"
              w={{ base: "80%", sm: "150px" }}
              colorScheme="blue"
              onClick={() => {
                setStandard("10th");
              }}
              boxShadow="2px 2px 5px rgba(0, 0, 0, 0.3)" 
            >
              10th
            </Button>
            <Button
              aria-label="11th & 12th"
              size="lg"
              w={{ base: "80%", sm: "150px" }}
              colorScheme="blue"
              onClick={() => {
                setStandard("12th");
              }}
              boxShadow="2px 2px 5px rgba(0, 0, 0, 0.3)" 
            >
              11th & 12th
            </Button>
          </Flex>
        )}

        {selectedStandard && !admin && (
          <>
            <Text
              fontSize={{ base: "16px", md: "20px" }}
              fontWeight="bold"
              textAlign="center"
            >
              The {selectedStandard} standard has been made available for you.
            </Text>
            <Button
              aria-label="Change Standard"
              size="sm"
              colorScheme="green"
              onClick={() => {
                setStandard(null); // Set standard to null
              }}
              mt={4}
              boxShadow="2px 2px 5px rgba(0, 0, 0, 0.3)" 
            >
              Change Standard
            </Button>
          </>
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
