import { Box, Text, Stack, RadioGroup, Radio, Button } from "@chakra-ui/react";
import { useState } from "react";

const MCQComponent = ({ question, onAnswerChange }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleAnswerChange = (value) => {
    setSelectedAnswer(value);
    onAnswerChange(value);
  };

  return (
    <Box p={4} width="100%" maxW="100%" mx="auto" borderWidth={2} borderRadius="md" bg={"blue.50"}>
      <Text fontSize="lg" fontWeight="bold">{question.question}</Text>
      <RadioGroup onChange={handleAnswerChange} value={selectedAnswer}>
        <Stack spacing={3}>
          {question.options.map((option, idx) => (
            <Radio key={idx} value={option}>{option}</Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default MCQComponent;
