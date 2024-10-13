import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const QuestionCreationForm = ({ onCreateQuestion }) => {
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [mcqOptions, setMcqOptions] = useState([""]);

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
    const newQuestion = {
      question,
      type: questionType,
      options: questionType === "MCQ" ? mcqOptions : null,
      answer: questionType !== "MCQ" ? "" : null,
    };
    onCreateQuestion(newQuestion);
    // Reset fields
    setQuestion("");
    setMcqOptions([""]);
    setQuestionType("");
  };

  return (
    <Box>
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

      <Button colorScheme="red" onClick={handleCreateQuestion}>
        Create Question
      </Button>
    </Box>
  );
};

export default QuestionCreationForm;
