import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Select,
  FormControl,
  FormLabel,
  Alert,
} from "@chakra-ui/react";

const QuestionCreationForm = ({ onCreateQuestion }) => {
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [mcqOptions, setMcqOptions] = useState([""]);
  const [alertVisible, setAlertVisible] = useState(false);

  // Handle adding more MCQ options
  const addMcqOption = () => {
    if (mcqOptions.length < 4) {
      setMcqOptions([...mcqOptions, ""]);
    } else {
      alert("You can only add up to 4 options.");
    }
  };

  // Handle input for MCQ options
  const handleMcqOptionChange = (index, value) => {
    const updatedOptions = [...mcqOptions];
    updatedOptions[index] = value;
    setMcqOptions(updatedOptions);
  };

  // Handle question creation
  const handleCreateQuestion = () => {
    if (!questionType) {
      setAlertVisible(true);
      return;
    }
    const newQuestion = {
      question,
      type: questionType,
      options: questionType === "MCQ" ? mcqOptions : null,
    };
    onCreateQuestion(newQuestion);
    // Reset fields
    setQuestion("");
    setMcqOptions([""]);
    setQuestionType("");
    setAlertVisible(false);
  };

  return (
    <Box>
      {alertVisible && ( // Conditionally render alert
        <Alert status="error" mb={4}>
          Please select a valid question type.
        </Alert>
      )}
      <FormControl id="question" mb={4}>
        <FormLabel>Enter Question</FormLabel>
        <Input
          placeholder="Type your question here"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </FormControl>

      <FormControl id="question-type" mb={4}>
        <FormLabel>Select Question Type</FormLabel>
        <Select
          placeholder="Select type"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option value="MCQ">MCQ</option>
          <option value="2 Marks">2 Marks</option>
          <option value="10 Marks">10 Marks</option>
        </Select>
      </FormControl>

      {questionType === "MCQ" && (
        <Box mb={4}>
          <FormLabel>Enter MCQ Options</FormLabel>
          {mcqOptions.map((option, index) => (
            <Input
              key={index}
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleMcqOptionChange(index, e.target.value)}
              mb={2}
            />
          ))}
          {mcqOptions.length < 4 && (
            <Button onClick={addMcqOption} mt={2}>
              Add More Options
            </Button>
          )}
        </Box>
      )}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button colorScheme="red" onClick={handleCreateQuestion}>
          Create Question
        </Button>
        </Box>
    </Box>
  );
};

export default QuestionCreationForm;
