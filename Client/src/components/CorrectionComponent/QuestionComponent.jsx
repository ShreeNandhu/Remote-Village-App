import { Box, Flex, Stack, Text, Button, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";

const QuestionComponent = ({ questionName, questionType, questions, handleScoresUpdate }) => {
  const [scores, setScores] = useState(questions.map(() => null)); // Initialize scores as an array

  const handleScoreChange = (index, value) => {
    const updatedScores = [...scores];
    updatedScores[index] = value;
    setScores(updatedScores); // Update the local state
    handleScoresUpdate(updatedScores); // Notify parent component of the updated scores
  };

  return (
    <Stack gap={4} mb={2}>
      <Flex justify="space-between" align="center">
        <Text fontWeight="bold" color="red.500" fontSize="xl">
          {questionName}
        </Text>
      </Flex>

      {questions.map((q, index) => (
        <Box key={q.no} p={4} bg="gray.100" shadow="md" borderRadius="md">
          <Text fontWeight="bold" mb={4}>
            {q.question}
          </Text>
          <Flex direction="column" gap={4}>
            <Text bg="white" p={2} borderRadius="md" shadow="sm" whiteSpace="pre-wrap">
              {q.answer}
            </Text>

            {questionType === "MCQ" ? (
              // Show buttons for MCQ
              <Flex gap={4}>
                <Button
                  colorScheme="green"
                  onClick={() => handleScoreChange(index, 1)}
                  isActive={scores[index] === 1}
                >
                  Right
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleScoreChange(index, 0)}
                  isActive={scores[index] === 0}
                >
                  Wrong
                </Button>
              </Flex>
            ) : questionType === "Text" ? (
              // Show textarea for text-based questions
              <Textarea
                size="sm"
                bg="white"
                placeholder="Score"
                value={scores[index] || ""}
                onChange={(e) => handleScoreChange(index, parseInt(e.target.value) || 0)}
              />
            ) : (
              <Text color="red.500">Unsupported question type</Text>
            )}
          </Flex>
        </Box>
      ))}
    </Stack>
  );
};

export default QuestionComponent;
