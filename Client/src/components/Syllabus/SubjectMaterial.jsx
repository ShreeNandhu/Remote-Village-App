import { Button, Divider, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const SubjectMaterial = ({topic}) => {
  return (
    <>
      <Text color="red.500" fontSize="xl" fontWeight={"bold"} mb={2} mt={2}>
        {topic}
      </Text>
      <Divider orientation="horizontal" borderColor="black.500" borderWidth="2px" mb={3} />
      <Stack gap={2}>
      <Flex
      w="auto"
      h="90px"
      bg="gray.200"
      borderRadius="md"
      _hover={{ shadow: "md" }}
      transition="shadow"
      p={3}
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
     // Space between items
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
        <Button colorScheme="blue" mx={1}>
          Download
        </Button>
        <Button colorScheme="green" mx={1}>
          View
        </Button>
      </Flex>
    </Flex>
      </Stack>
    </>
  );
};

export default SubjectMaterial;
