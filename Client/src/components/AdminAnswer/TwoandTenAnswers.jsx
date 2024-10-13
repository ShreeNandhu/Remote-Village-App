import { Box, Flex, Stack, Text, Textarea } from "@chakra-ui/react";
import React from "react";

const TwoandTenAnswers = ({questionName}) => {
  const questions = [
    {
      no: "Question 1",
      question: "What is the capital of France?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of",
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
                height="150px" // Set a specific height limit
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

export default TwoandTenAnswers;
