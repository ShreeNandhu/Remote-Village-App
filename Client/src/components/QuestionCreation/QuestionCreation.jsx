import React, { useState } from "react";
import {
  Flex,
  Text,
  Divider,
  Box,
  Button,
  FormLabel,
  Input,
  Select,
  FormControl,
  Alert,
} from "@chakra-ui/react";
import CreatedQuestions from "./CreatedQuestions";
import useQuestionStorage from "../../hooks/useQuestionStorage";
import useShowToast from "../../hooks/useShowToast";

const QuestionCreation = () => {
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [standard, setStandard] = useState("");
  const [board, setBoard] = useState("");
  const [mcqOptions, setMcqOptions] = useState([""]);
  const [questions, setQuestions] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);

  const { saveQuestion, loading, error } = useQuestionStorage();
  const showToast = useShowToast();

  const addMcqOption = () => {
    if (mcqOptions.length >= 4) {
      showToast("Warning", "You can only add up to 4 options.", "warning");
      return;
    }
    setMcqOptions([...mcqOptions, ""]);
  };

  const handleMcqOptionChange = (index, value) => {
    setMcqOptions((prevOptions) =>
      prevOptions.map((option, i) => (i === index ? value : option))
    );
  };

  const handleCreateQuestion = () => {
    if (!question.trim() || !questionType || !subjectName || !standard || !board) {
      setAlertVisible(true);
      return;
    }

    const newQuestion = {
      question: question.trim(),
      type: questionType,
      options: questionType === "MCQ" ? mcqOptions : null,
      subject: subjectName,
      standard,
      board,
    };

    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setQuestion(""); // Clear the question
    setMcqOptions([""]); // Clear the MCQ options
    setQuestionType(""); // Clear the question type
    setAlertVisible(false); // Hide alert after question is added
  };

  const handleDeleteQuestion = (index) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
  };

  const handlePublish = async () => {
    if (!questions.length) {
      showToast("Warning", "No questions to publish.", "warning");
      return;
    }
    
    const confirmed = window.confirm(
      "Are you sure you want to publish the questions?"
    );
    
    if (!confirmed) return;
    const questionPaperId = `paper_${Date.now()}`;

    try {
      for (const question of questions) {
        const { question: qText, type, options, subject } = question;

        if (!qText.trim() || !type) {
          showToast(
            "Error",
            "Invalid question data. Please check the inputs.",
            "error"
          );
          return;
        }

        await saveQuestion({
          question: qText,
          questionType: type,
          mcqOptions: type === "MCQ" ? options : [],
          questionPaperId,
          subject,
          standard,
          board,
        });
      }

      setQuestions([]); // Clear questions after publishing
      showToast("Success", "Questions published successfully!", "success");
    } catch (err) {
      showToast("Error", "An error occurred while publishing questions.", "error");
    }
  };

  return (
    <>
      <Text color="blue.500" fontWeight="bold" fontSize="xl" mb={2}>
        Question Creation
      </Text>
      <Divider orientation="horizontal" borderColor="black.500" borderWidth="2px" />
      <Box mx="auto" m={2} p={6} bg="gray.50" borderRadius="md" boxShadow="md">
        <Flex direction="column" p={2}>
          <Box>
            {alertVisible && (
              <Alert status="error" mb={4}>
                Please enter a question and select a valid question type.
              </Alert>
            )}
            {/* Subject Name */}
            <FormControl id="subject-name" mb={4} isRequired>
              <FormLabel>Subject Name</FormLabel>
              <Input
                placeholder="Subject Name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
            </FormControl>
            <FormControl id="standard" mb={4} isRequired>
              <FormLabel>Standard</FormLabel>
              <Select
                placeholder="Select Standard"
                value={standard}
                onChange={(e) => setStandard(e.target.value)}
              >
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="Both">Both</option>
              </Select>
            </FormControl>
            <FormControl id="board" mb={4} isRequired>
              <FormLabel>Board</FormLabel>
              <Select
                placeholder="Select Board"
                value={board}
                onChange={(e) => setBoard(e.target.value)}
              >
                <option value="CBSE">CBSE</option>
                <option value="Stateboard">Stateboard</option>
                <option value="Both">Both</option>
              </Select>
            </FormControl>

            {/* Question Input */}
            <FormControl id="question-input" mb={4} isRequired>
              <FormLabel>Enter Question</FormLabel>
              <Input
                placeholder="Type your question here"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </FormControl>

            {/* Question Type */}
            <FormControl id="question-type" mb={4} isRequired>
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

            {/* MCQ Options */}
            {questionType === "MCQ" && (
              <Box mb={4}>
                <FormLabel>Enter MCQ Options</FormLabel>
                {mcqOptions.map((option, index) => (
                  <Input
                    key={index}
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleMcqOptionChange(index, e.target.value)
                    }
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

            {/* Create Question Button */}
            <Box display="flex" justifyContent="center" mt={4}>
              <Button colorScheme="red" onClick={handleCreateQuestion}>
                Create Question
              </Button>
            </Box>
          </Box>

          {/* Created Questions */}
          <CreatedQuestions
            createdQuestions={questions}
            onDeleteQuestion={handleDeleteQuestion}
          />

          {/* Publish Button */}
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              colorScheme="green"
              onClick={handlePublish}
              isLoading={loading}
              disabled={loading || !questions.length}
            >
              Publish
            </Button>
          </Box>
          {error && (
            <Alert status="error" mt={4}>
              {error}
            </Alert>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default QuestionCreation;
