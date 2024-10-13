import React, { useState } from "react";
import { Flex, Text, Divider } from "@chakra-ui/react";
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
      <Text color="red.500" fontWeight="bold">
        Question Creation
      </Text>
      <Divider orientation="horizontal" border={2} />
      <Flex direction="column" align="center" p={6}>
        <QuestionCreationForm onCreateQuestion={handleCreateQuestion} />
        <CreatedQuestions
          createdQuestions={createdQuestions}
          onDeleteQuestion={handleDeleteQuestion}
        />
      </Flex>
    </>
  );
};

export default QuestionCreation;
