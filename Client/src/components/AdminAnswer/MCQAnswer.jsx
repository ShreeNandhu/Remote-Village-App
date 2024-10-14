import { Box, Stack, Text, Textarea, Flex } from '@chakra-ui/react';
import React from 'react';

const MCQAnswer = () => {
  const questions = [
    {
      no: "Question 1",
      question: "What is the capital of France?",
      answer:
        "Paris is the capital of France. It is known for its art, fashion, and culture.",
    },
    {
      no: "Question 2",
      question: "What is the largest ocean on Earth?",
      answer: "Pacific Ocean",
    },
    // Add more questions as needed
  ];

  return (
    <Stack gap={4} mb={2}>
      {questions.map((q) => (
        <Box key={q.no} p={4} bg="gray.100" shadow="md" borderRadius="md" h={"auto"}>
          <Text fontWeight="bold" mb={4} color="red.500">
            {q.no}: {q.question}
          </Text>

          <Flex direction="column">
            <Textarea
              isReadOnly // Make Textarea read-only, no alteration allowed
              value={q.answer} // Display the answer
              bg="white"
              size="lg"
              mr={3}
              height="150px"
              whiteSpace="normal"
              overflow="auto" // Enables scrolling if the content exceeds the max height
              mb={4}
            />

            <Box w={"auto"}>
              <Textarea
                size="sm"
                bg={"white"}
                placeholder="Score Out of 100"
              />
            </Box>
          </Flex>
        </Box>
      ))}
    </Stack>
  );
};

export default MCQAnswer;
