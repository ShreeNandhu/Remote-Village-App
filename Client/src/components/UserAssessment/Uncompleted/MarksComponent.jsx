import { Box, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const MarksComponent = ({ questionType, question }) => {
  const [answer, setAnswer] = useState("");

  return (
    <Box p={4} width="100%" maxW="100%" mx="auto" borderWidth={2} borderRadius="md" bg={"gray.50"}>
      <Text fontSize="lg" fontWeight="bold">{question.question}</Text>
      <Textarea
        mt={2}
        placeholder={`Enter your answer (${questionType})`}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        size="md"
      />
    </Box>
  );
};

export default MarksComponent;
