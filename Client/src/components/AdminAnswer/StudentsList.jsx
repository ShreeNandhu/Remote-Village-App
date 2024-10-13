import { Button, Divider, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import CorrectionPage from "./CorrectionPage"; // Assuming this is the page you want to render after clicking "Evaluate"

const StudentsList = () => {
  const [showCorrectionPage, setShowCorrectionPage] = useState(false); // Correct state variable name

  const handleEvaluateButton = () => {
    setShowCorrectionPage(true); // Set to true when "Evaluate" button is clicked
  };

  const Student = [
    {
      name: "example1",
      email: "example@gmail.com",
      subject: "Maths",
    },
    {
      name: "example2",
      email: "example2@gmail.com",
      subject: "Science",
    },
    // Add more students as needed
  ];

  return (
    <>
      {!showCorrectionPage ? ( // Conditionally render CorrectionPage or Students List
        <>
          <Text color="red.500" fontSize="xl" fontWeight={"bold"} mb={2}>
            Student Name
          </Text>
          <Divider
            orientation="horizontal"
            borderColor="black.500"
            borderWidth="2px"
            mb={3}
          />
          <Stack gap={2}>
            {Student.map((s) => (
              <Flex
                key={s.email} // Add a unique key for each item
                w="auto"
                h="90px"
                bg="gray.200"
                borderRadius="md"
                _hover={{ shadow: "md" }}
                transition="shadow"
                p={5}
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                {/* Left Side - Student Info */}
                <Flex flexDirection="column">
                  <Text fontSize="2xl" fontWeight="bold">
                    {s.name}
                  </Text>
                  <Text fontSize="md" fontWeight="bold" color="gray.500">
                    {s.email}
                  </Text>
                </Flex>

                {/* Center - Subject */}
                <VStack flex={1} mx={4} alignItems="center" spacing={0}>
                  <Text fontSize="md" fontWeight="bold" color="gray">
                    Subject:
                  </Text>
                  <Text fontSize="md" color="gray.600">
                    {s.subject}
                  </Text>
                </VStack>

                {/* Right Side - Evaluate Button */}
                <Flex>
                  <Button colorScheme="green" mx={1} onClick={handleEvaluateButton}>
                    Evaluate
                  </Button>
                </Flex>
              </Flex>
            ))}
          </Stack>
        </>
      ) : (
        <CorrectionPage /> // Render the CorrectionPage component after Evaluate is clicked
      )}
    </>
  );
};

export default StudentsList;
