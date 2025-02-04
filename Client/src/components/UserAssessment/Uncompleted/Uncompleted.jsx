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
import Test from "./Test"; // Import the Test component
import useFetchQuestions from "../../../hooks/useFetchQuestions"; // Import the custom hook

const Uncompleted = () => {
  const [showTest, setShowTest] = useState(false);
  const { questions, loading, error } = useFetchQuestions();

  // Extract unique question papers
  const uniquePapers = questions.reduce((acc, question) => {
    if (!acc.some((q) => q.questionPaperId === question.questionPaperId)) {
      acc.push({ id: question.questionPaperId, subject: question.subject });
    }
    return acc;
  }, []); // Fetch questions from Firebase
   console.log(uniquePapers);
  const handleStartTest = (paperId) => {
    setShowTest(true);
  };

  if (showTest) {
    return <Test />; // Render the Test component if showTest is true
  }

  return (
    <>
      <Text color="blue.700" fontSize="xl" fontWeight={"bold"} mb={2} mt={2}>
        List of Assessment
      </Text>
      <Divider
        orientation="horizontal"
        borderColor="black.500"
        borderWidth="2px"
        mb={3}
      />
      <Stack gap={4}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.300" />
          </Box>
        ) : error ? (
          <Text color="red.500">Error fetching papers: {error}</Text>
        ) : uniquePapers.length > 0 ? (
          uniquePapers.map((paper, index) => (
            <Flex
              key={paper.questionPaperId} // Use questionPaperId as the key
              w="auto"
              bg="gray.200"
              borderRadius="md"
              _hover={{ shadow: "md" }}
              transition="shadow"
              p={4}
              flexDirection="column"
            >
              {/* Paper Header */}
              <Flex
                w="100%"
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row"
              >
                {/* Left Side - Paper Name */}
                <Text fontSize="3xl" fontWeight="bold">
                  {`Paper ${index + 1}`}
                </Text>

                <VStack flex={1} mx={4} alignItems="center" spacing={0}>
                  <Text fontSize="md" fontWeight="bold" color="gray">
                    Subject:
                  </Text>
                  <Text fontSize="md" color="gray.600">
                    {paper.subject}
                  </Text>
                </VStack>

                {/* Right Side - Start Button */}
                <Flex>
                  <Button
                    colorScheme="green"
                    mx={1}
                    onClick={() => handleStartTest(paper.id)}
                  >
                    Start Test
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          ))
        ) : (
          <Text>No question papers available</Text>
        )}
      </Stack>
    </>
  );
};

export default Uncompleted;
