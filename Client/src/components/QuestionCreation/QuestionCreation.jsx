import React, { useState } from "react";
import { Flex, Text, Divider, Box, Button } from "@chakra-ui/react";
import QuestionCreationForm from "./QuestionCreationForm";
import CreatedQuestions from "./CreatedQuestions";

const QuestionCreation = () => {
  const [createdQuestions, setCreatedQuestions] = useState([]);

  // Handle question creation
  const handleCreateQuestion = (newQuestion) => {
    setCreatedQuestions([...createdQuestions, newQuestion]);
  };

  // Handle deleting a question
  const handleDeleteQuestion = (index) => {
    const updatedQuestions = createdQuestions.filter((_, i) => i !== index);
    setCreatedQuestions(updatedQuestions);
  };

  return (
    <>
      <Text color="red.500" fontWeight="bold" fontSize="xl">
        Question Creation
      </Text>
      <Divider orientation="horizontal" border={2} />
      <Flex direction="column" p={3}>
        <QuestionCreationForm onCreateQuestion={handleCreateQuestion} />
        <CreatedQuestions
          createdQuestions={createdQuestions}
          onDeleteQuestion={handleDeleteQuestion}
        />

        {/* Show Publish button only if there are questions */}
        {createdQuestions.length > 0 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Button colorScheme="green">Publish</Button>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default QuestionCreation;
