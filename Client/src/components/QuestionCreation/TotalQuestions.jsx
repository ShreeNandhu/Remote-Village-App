import React, { useState, useEffect } from "react";
import { Button, Divider, Flex, Stack, Text, VStack, Spinner, Box } from "@chakra-ui/react";
import useFetchQuestions from "../../hooks/useFetchQuestions";
import Question from "./Question"; // Import the QuestionList component

const TotalQuestions = () => {
  const { data, loading, error } = useFetchQuestions();
  const [selectedPaperId, setSelectedPaperId] = useState(null);

  // If a question paper is selected, render the QuestionList component
  if (selectedPaperId) {
    return <Question questionPaperId={selectedPaperId} onBack={() => setSelectedPaperId(null)} />;
  }

  // Ensure `data` is available before using reduce
  const groupedQuestions = data
    ? data.reduce((acc, paper) => {
        if (!acc[paper.questionPaperId]) {
          acc[paper.questionPaperId] = {
            subject: paper.subject,
            standard: paper.standard,
            board: paper.board,
          };
        }
        return acc;
      }, {})
    : {};

  return (
    <>
      <Text color="blue.700" fontSize="xl" fontWeight="bold" mb={2} mt={2}>
        List of Question Papers
      </Text>
      <Divider orientation="horizontal" borderColor="black.500" borderWidth="2px" mb={3} />
      
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.300" />
        </Box>
      ) : error ? (
        <Text color="red.500">Error fetching questions: {error}</Text>
      ) : Object.keys(groupedQuestions).length > 0 ? (
        <Stack gap={4}>
          {Object.entries(groupedQuestions).map(([questionPaperId, data], index) => (
            <Flex
              key={questionPaperId}
              bg="gray.200"
              borderRadius="md"
              _hover={{ shadow: "md" }}
              transition="shadow"
              p={4}
              flexDirection="column"
            >
              <Flex w="100%" alignItems="center" justify="space-between">
                <Text fontSize="2xl" fontWeight="bold">{`Paper ${index + 1}`}</Text>
                <VStack flex={1} mx={4} align="center" spacing={2}>
                  <Text fontSize="md" fontWeight="bold" color="gray">Subject:</Text>
                  <Text fontSize="md" color="gray.600">{data.subject}</Text>
                </VStack>
                <VStack flex={1} mx={4} align="center" spacing={2}>
                  <Text fontSize="md" fontWeight="bold" color="gray">Standard:</Text>
                  <Text fontSize="md" color="gray.600">{data.standard}</Text>
                </VStack>
                <VStack flex={1} mx={4} align="center" spacing={2}>
                  <Text fontSize="md" fontWeight="bold" color="gray">Board:</Text>
                  <Text fontSize="md" color="gray.600">{data.board}</Text>
                </VStack>
                <Button colorScheme="green" onClick={() => setSelectedPaperId(questionPaperId)}>
                  Show Paper
                </Button>
              </Flex>
            </Flex>
          ))}
        </Stack>
      ) : (
        <Text>No questions available</Text>
      )}
    </>
  );
};

export default TotalQuestions;
