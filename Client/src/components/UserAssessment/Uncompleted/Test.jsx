import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useFetchQuestions from "../../../hooks/useFetchQuestions";
import useSubmitAnswers from "../../../hooks/useSubmitAnswers";
import MCQComponent from "./MCQComponent";
import MarksComponent from "./MarksComponent";
import Uncompleted from "./Uncompleted";

const Test = ({ questionPaperId }) => {
  const { data, loading, error } = useFetchQuestions();
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [timer, setTimer] = useState(60);

  // Fetch questions and set up submission hook
  const { answers, isCompleted, handleAnswerChange, handleSubmit } =
    useSubmitAnswers(questionPaperId, questions);

  const foundPaper = data?.find(
    (paper) => paper.questionPaperId === questionPaperId
  );
  const mcqQuestions = foundPaper?.mcqQuestions || [];
  const twoMarkQuestions = foundPaper?.twoMarkQuestions || [];
  const tenMarkQuestions = foundPaper?.tenMarkQuestions || [];

  useEffect(() => {
    if (foundPaper) {
      setQuestions([...mcqQuestions, ...twoMarkQuestions, ...tenMarkQuestions]);
    }
  }, [foundPaper, mcqQuestions, twoMarkQuestions, tenMarkQuestions]);

  useEffect(() => {
    let time = 0;
    if (currentPage === 1) time = mcqQuestions.length * 60;
    else if (currentPage === 2) time = twoMarkQuestions.length * 300;
    else if (currentPage === 3) time = tenMarkQuestions.length * 900;

    setTimer(time);
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
  }, [currentPage, mcqQuestions.length, twoMarkQuestions.length, tenMarkQuestions.length]);

  const handleNext = () => {
    if (currentPage === 1) setCurrentPage(2);
    else if (currentPage === 2) setCurrentPage(3);
    else handleSubmit(); // Submit only on the last section
  };

  if (loading) return <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.300" />;
  if (error) return <Text fontSize="lg" color="red.500">{error}</Text>;
  if (isCompleted) {
    return <Uncompleted />; // Render Uncompleted if submission is complete
  }

  return (
    <Flex direction="column" align="center" p={4}>
      {!foundPaper ? (
        <Text fontSize="lg" fontWeight="bold" color="gray.500">
          No question paper found.
        </Text>
      ) : (
        <>
          <Flex width="100%" justify="space-between" mb={4}>
            {currentPage > 1 && (
              <Button onClick={() => setCurrentPage((prev) => prev - 1)} colorScheme="gray">
                Back
              </Button>
            )}
            <Text fontSize="lg" color="red.600" fontWeight="bold">
              Timer: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
            </Text>
          </Flex>

          {/* MCQ Questions Section */}
          {currentPage === 1 && (
            <>
              <Text fontWeight="bold" textAlign="center" mb={2}>MCQ Questions</Text>
              {mcqQuestions.map((question) => (
                <MCQComponent
                  key={question.id}
                  question={question}
                  onAnswerChange={(value) => handleAnswerChange(value, question.id)}
                />
              ))}
            </>
          )}

          {/* Two Mark Questions Section */}
          {currentPage === 2 && (
            <>
              <Text fontWeight="bold" textAlign="center" mb={2}>Two Mark Questions</Text>
              {twoMarkQuestions.map((question) => (
                <MarksComponent
                  key={question.id}
                  questionType="2 Marks"
                  question={question}
                  onAnswerChange={(value) => handleAnswerChange(value, question.id)}
                />
              ))}
            </>
          )}

          {/* Ten Mark Questions Section */}
          {currentPage === 3 && (
            <>
              <Text fontWeight="bold" textAlign="center" mb={2}>Ten Mark Questions</Text>
              {tenMarkQuestions.map((question) => (
                <MarksComponent
                  key={question.id}
                  questionType="10 Marks"
                  question={question}
                  onAnswerChange={(value) => handleAnswerChange(value, question.id)}
                />
              ))}
            </>
          )}

          {!isCompleted && (
            <Button onClick={handleNext} colorScheme="blue" mt={4}>
              {currentPage === 3 ? "Finish" : "Next Section"}
            </Button>
          )}
        </>
      )}
    </Flex>
  );
};

export default Test;
