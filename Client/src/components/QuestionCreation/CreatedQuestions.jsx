import React from "react";
import { Box, Button, Stack, Flex } from "@chakra-ui/react";

const CreatedQuestions = ({ createdQuestions, onDeleteQuestion }) => {
  return (
    <Box mt={6} w="100%">
      <Stack spacing={4}>
        {createdQuestions.length > 0 ? (
          createdQuestions.map((q, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md">
              <strong>Question {index + 1}:</strong> {q.question} <br />
              <strong>Type:</strong> {q.type} <br />
              {q.type === "MCQ" && (
                <Box>
                  <strong>Options:</strong>
                  <ul>
                    {q.options.map((option, idx) => (
                      <Flex ml={3} key={idx}>
                        <li>{option}</li>
                      </Flex>
                    ))}
                  </ul>
                </Box>
              )}
              
              <Button
                colorScheme="red"
                mt={2}
                onClick={() => onDeleteQuestion(index)}
              >
                Delete
              </Button>
            
            </Box>
          ))
        ) : (
          <Box>No questions created yet.</Box>
        )}
      </Stack>
    </Box>
  );
};

export default CreatedQuestions;
