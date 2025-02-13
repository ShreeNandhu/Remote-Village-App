import React, { useState, useEffect } from "react";
import { Divider, Flex, Stack, Text, VStack, Spinner, Box, Button } from "@chakra-ui/react";
import useFetchQuestions from "../../../hooks/useFetchQuestions";
import useCheckQuestion from "../../../hooks/useCheckQuestion";

const Completed = () => {
  const { data, loading, error } = useFetchQuestions();
  const [selectedPaperId, setSelectedPaperId] = useState(null);
  const [scores, setScores] = useState({});
  const { attended, score } = useCheckQuestion(selectedPaperId); // Get attended status and score for selected paper

  // Grouping papers by questionPaperId
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
        Completed Assessments
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
          {Object.entries(groupedQuestions).map(([questionPaperId, data], index) => {
            return (
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
                </Flex>

                {/* Button to fetch result */}
                <Button colorScheme="green" mt={3} onClick={() => setSelectedPaperId(questionPaperId)}>
                  Show Result
                </Button>

                {/* Display score or correction status */}
                {selectedPaperId === questionPaperId && (
                  <Box mt={4} p={2} bg="white" borderRadius="md" boxShadow="sm" textAlign="center">
                    {attended ? (
                      score !== "" && score !== null && score !== undefined ? (
                        <Text fontSize="lg" fontWeight="bold" color="green.600">
                          Your Score: <b>{score}</b>
                        </Text>
                      ) : (
                        <Text fontSize="lg" fontWeight="bold" color="red.500">
                          Your paper is not corrected yet.
                        </Text>
                      )
                    ) : (
                      <Text fontSize="lg" fontWeight="bold" color="gray.500">
                        You have not attended this test.
                      </Text>
                    )}
                  </Box>
                )}
              </Flex>
            );
          })}
        </Stack>
      ) : (
        <Text>No completed assessments available</Text>
      )}
    </>
  );
};

export default Completed;
