import { Button, Divider, Flex, Stack, Text, VStack, Box } from "@chakra-ui/react";
import React, { useState } from "react";

const Completed = () => {
  const [showScores, setShowScores] = useState(false);

  // Toggle scores visibility
  const handleToggleScores = () => {
    setShowScores((prev) => !prev);
  };

  return (
    <>
      <Text color="blue.700" fontSize="xl" fontWeight={"bold"} mb={2} mt={2}>
        List of Assessment
      </Text>
      <Divider orientation="horizontal" borderColor="black.500" borderWidth="2px" mb={3} />
      <Stack gap={2}>
        <Flex
          w="auto"
          bg="gray.200"
          borderRadius="md"
          _hover={{ shadow: "md" }}
          transition="shadow"
          p={3}
          flexDirection="column"
        >
          {/* Top Section */}
          <Flex
            w="100%"
            h="90px"
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
          >
            {/* Left Side - Example File */}
            <Text fontSize="3xl" fontWeight="bold">
              Example File
            </Text>

            {/* Center - Uploaded By and Author Name */}
            <VStack flex={1} mx={4} alignItems="center" spacing={0}>
              <Text fontSize="md" fontWeight="bold" color="gray">
                Uploaded By:
              </Text>
              <Text fontSize="md" color="gray.600">
                Author Name
              </Text>
            </VStack>

            {/* Right Side - Buttons */}
            <Flex>
              <Button colorScheme="green" mx={1} onClick={handleToggleScores}>
                Finished
              </Button>
            </Flex>
          </Flex>

          {/* Conditional Section for Scores */}
          {showScores && (
            <Box mt={3} bg="gray.50" p={4} borderRadius="md" shadow="sm">
              <Text fontSize="lg" fontWeight="bold" color="green.500">
                Scores: 85/100
              </Text>
              <Text fontSize="md" color="gray.600">
                Great job! You can review your performance in the dashboard.
              </Text>
            </Box>
          )}
        </Flex>
      </Stack>
    </>
  );
};

export default Completed;
