import { Box, Flex, Stack, Text, Textarea } from "@chakra-ui/react";
import React from "react";

const MCQAnswers = ({questionName}) => {
  const questions = [
    {
      no: "Question 1",
      question: "What is the capital of France?",
      answer:
        "Paris",
    },
    {
      no: "Question 2",
      question: "What is the largest ocean on Earth?",
      answer: "Pacific Ocean",
    },
    // Add more questions as needed
  ];

  return (
    <>
      <Stack gap={4} mb={2}>
        <Text fontWeight="bold" color={"red.500"} fontSize={"xl"}>
          {questionName}
        </Text>
        {questions.map((q) => (
          <Box key={q.no} p={4} bg="gray.100" shadow="md" borderRadius="md" h={"auto"} >
            <Text fontWeight="bold" mb={4}>
              {q.question}
            </Text>
            <Flex dir={"column"} >
              <Textarea
                isDisabled
                value={q.answer} // Display the answer in the disabled Textarea
                bg="white"
                size="lg"
                mr={3}
                maxWidth="auto"
                height="40px" // Set a specific height limit
                whiteSpace="normal" // Allows text to wrap
                overflow="auto" // Enables scrolling if the content exceeds the max height
              />

              <Box w={"auto"} h={2}>
                <Textarea
                  size="sm"
                  bg={"white.500"}
                  placeholder="Score Out of 100"
                />
              </Box>
            </Flex>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default MCQAnswers;
