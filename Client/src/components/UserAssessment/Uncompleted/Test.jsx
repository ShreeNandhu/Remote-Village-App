import { useState, useEffect } from "react";
import { Flex, Text, Stack, Button, Spinner } from "@chakra-ui/react";
import MCQComponent from "./MCQComponent";
import MarksComponent from "./MarksComponent";
import useFetchQuestions from "../../../hooks/useFetchQuestions";

const Test = () => {
  const { questions, loading, error } = useFetchQuestions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    if (!questions || questions.length === 0) return;

    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) return;

    let time = currentQuestion.type === "MCQ" ? 60 : currentQuestion.type === "2 Marks" ? 300 : 900;
    setTimer(time);
    setSelectedAnswer(""); // Reset selected answer when switching questions

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          handleNext();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, questions]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleAnswerChange = (value) => {
    setSelectedAnswer(value);
  };

  const renderContent = () => {
    if (loading) return <Spinner size="xl" />;
    if (error) return <Text fontSize="lg" fontWeight="bold" color="red.500" textAlign="center">{error}</Text>;
    if (!questions || questions.length === 0) return <Text fontSize="lg" fontWeight="bold" color="gray.500" textAlign="center">No questions available.</Text>;

    if (isCompleted) {
      return <Text fontSize="lg" fontWeight="bold" color="green.500" textAlign="center">Test Completed! Submit your answers.</Text>;
    }

    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) return null;

    return currentQuestion.type === "MCQ" ? (
      <MCQComponent question={currentQuestion} onAnswerChange={handleAnswerChange} />
    ) : (
      <MarksComponent questionType={currentQuestion.type} question={currentQuestion} />
    );
  };

  return (
    <Flex direction="column" align="center" p={4}>
      <Flex width="100%" mb={4}>
        <Button onClick={() => alert("Go back")} colorScheme="blue" variant="outline">Back</Button>
      </Flex>

      <Text fontSize="2xl" fontWeight="bold" mb={4}>Question {currentIndex + 1} of {questions?.length}</Text>
      <Text fontSize="lg" color="gray.600" fontWeight="medium">Timer: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</Text>

      {renderContent()}

      {!isCompleted && (
        <Button 
          onClick={handleNext} 
          colorScheme="blue" 
          mt={4} 
          isDisabled={questions[currentIndex]?.type === "MCQ" && !selectedAnswer} // Disable until answered
        >
          {currentIndex === questions.length - 1 ? "Submit" : "Next"}
        </Button>
      )}
    </Flex>
  );
};

export default Test;
