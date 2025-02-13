import { Box, Flex, Stack, Text, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const QuestionComponent = ({ questionName, questions, updateTotalScore }) => {
  const [score, setScore] = useState(0); // Store the current score for this question

  const handleScoreChange = (e) => {
    const value = parseFloat(e.target.value); // Convert input to number
    if (isNaN(value)) return; // Ignore non-numeric input

    const newScore = value; // New score input
    const prevScore = score; // Store the previous score before update

    setScore(newScore); // Update local state

    // Update total score in CorrectionPage (add newScore, subtract prevScore)
    updateTotalScore(newScore - prevScore);
  };

  return (
    <Stack gap={4} mb={2}>
      <Flex justify="space-between" align="center">
        <Text fontWeight="bold" color="red.500" fontSize="xl">
          {questionName}
        </Text>
      </Flex>

      {questions.map((q, index) => (
        <Box key={q.no || `question-${index}`} p={4} bg="gray.100" shadow="md" borderRadius="md">
          {/* Display Question */}
          <Text fontWeight="bold" mb={2}>
            {q.question}
          </Text>

          {/* Display Answer */}
          <Text bg="white" p={2} borderRadius="md" shadow="sm" mb="5px">
            {q.answer}
          </Text>

          {/* Manual Score Input */}
          <Input
            size="sm"
            bg="white"
            placeholder="Enter Score"
            onChange={handleScoreChange} // Updates total when the user types
          />
        </Box>
      ))}
    </Stack>
  );
};

export default QuestionComponent;
