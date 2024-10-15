import { Box, Textarea, Text, Stack, Button } from "@chakra-ui/react";

const TwoMarksComponent = () => {
  const questions = [
    { no: "Question 1", question: "What is the capital of France?" },
    { no: "Question 2", question: "What is the largest ocean on Earth?" },
    // Add more questions as needed
  ];
  return (
    <>
      <Stack gap={4}>
        <Text fontWeight="bold" color={"red.500"} fontSize={"xl"}>
          Two Marks:
        </Text>
        {questions.map((q) => (
          <Box key={q.no} p={4} bg="gray.100" shadow="md" borderRadius="md">
            <Text fontWeight="bold" mb={4}>
              {q.question}
            </Text>
            <Textarea
              bg="white"
              placeholder="Write your answer here..."
              size="lg"
            />
          </Box>
        ))}
        <Box display="flex" justifyContent="flex-end">
          <Button colorScheme="green">Submit</Button>
        </Box>
      </Stack>
    </>
  );
};

export default TwoMarksComponent;
