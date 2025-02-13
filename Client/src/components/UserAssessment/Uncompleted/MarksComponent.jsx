import { Box, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const MarksComponent = ({ questionType, question, onAnswerChange }) => {
  const [answer, setAnswer] = useState(""); // Corrected state name

  const handleAnswerChange = (value) => {
    setAnswer(value); // Update the state with the correct value
    onAnswerChange(value); // Propagate the answer to the parent component
  };

  return (
    <Box p={4} width="100%" maxW="100%" mx="auto" borderWidth={2} borderRadius="md" bg={"blue.50"} mt="10px">
      <Text fontSize="lg" fontWeight="bold">{question.question}</Text>
      <Textarea
        mt={2}
        placeholder={`Enter your answer (${questionType})`}
        value={answer}
        onChange={(e) => handleAnswerChange(e.target.value)} // Corrected the event handler
        size="md"
      />
    </Box>
  );
};

export default MarksComponent;
