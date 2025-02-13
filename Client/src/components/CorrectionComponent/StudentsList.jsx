import {
  Button,
  Divider,
  Flex,
  Stack,
  Text,
  VStack,
  Spinner,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CorrectionPage from "./CorrectionPage"; // Ensure CorrectionPage is imported
import useFetchTestData from "../../hooks/useFetchTestdata";

const StudentsList = () => {
  const { data, error, loading } = useFetchTestData();
  const [showCorrectionPage, setShowCorrectionPage] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedTestSubmit, setSelectedTestSubmit] = useState(null);

  const handleEvaluateButton = (studentId,testSubmit) => {
    setSelectedUserId(studentId); // Store selected user ID
    setSelectedTestSubmit(testSubmit); // Store selected user ID
    setShowCorrectionPage(true); // Show correction page
  };

  const handleBack = () => {
    setShowCorrectionPage(false);
    setSelectedUserId(null);
  };

  return (
    <>
      {!showCorrectionPage ? (
        <>
          <Text color="blue.700" fontSize="xl" fontWeight="bold" mb={2} mt={2}>
            List of Answer Sheets
          </Text>
          <Divider
            orientation="horizontal"
            borderColor="black.500"
            borderWidth="2px"
            mb={3}
          />

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <Flex direction="column" align="center" gap={2}>
              <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.300" />
              <Text fontSize="md" color="blue.200">Loading student responses...</Text>
            </Flex>
          </Box>
          
          ) : error ? (
            <Text color="red.500">Error fetching students: {error}</Text>
          ) : data?.length > 0 ? (
            <Stack gap={4}>
              {data.map((student) => (
                <Flex
                  key={student.userId}
                  w="auto"
                  h="90px"
                  bg="gray.50"
                  borderRadius="md"
                  _hover={{ shadow: "md" }}
                  transition="shadow 0.3s ease-in-out"
                  p={5}
                  alignItems="center"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Flex flexDirection="column">
                    <Text fontSize="2xl" fontWeight="bold">
                      {student.username}
                    </Text>
                    <Text fontSize="md" fontWeight="bold" color="gray.500">
                      {student.email}
                    </Text>
                  </Flex>

                  <VStack flex={1} mx={4} alignItems="center" spacing={0}>
                    <Text fontSize="md" fontWeight="bold" color="gray">
                      Subject:
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      {student.subject}
                    </Text>
                  </VStack>

                  <Flex>
                    <Button
                      colorScheme="green"
                      mx={1}
                      onClick={() => handleEvaluateButton(student.userId,student.testSubmit)}
                    >
                      Evaluate
                    </Button>
                  </Flex>
                </Flex>
              ))}
            </Stack>
          ) : (
            <Text>No students available.</Text>
          )}
        </>
      ) : (
        <CorrectionPage userId={selectedUserId} submission={selectedTestSubmit} onBack={handleBack} />
      )}
    </>
  );
};

export default StudentsList;
