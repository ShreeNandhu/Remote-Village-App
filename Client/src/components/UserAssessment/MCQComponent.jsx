import { Box, Text, Stack, Radio, RadioGroup } from "@chakra-ui/react";

const MCQComponent = () => {
  const questions = [
    { no: "Question 1", question: "What is the capital of France?", options: ["Paris", "London", "Rome", "Berlin"] },
    { no: "Question 2", question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"] },
    // Add more questions as needed
  ];

  return (
    <Stack spacing={4}>
      {questions.map((q) => (
        <Box key={q.no} p={4} bg="gray.100"  shadow="md" borderRadius="md">
          <Text fontWeight="bold" color="red.500" fontSize={"xl"} mb={2}>{q.no}</Text>
          <Text fontWeight="bold">{q.question}</Text>
          <RadioGroup>
            <Stack>
              {q.options.map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Box>
      ))}
    </Stack>
  );
};

export default MCQComponent;
