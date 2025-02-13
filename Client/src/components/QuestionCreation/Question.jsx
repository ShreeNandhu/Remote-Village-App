import { Button, Flex, Text, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useFetchQuestions from "../../hooks/useFetchQuestions";
import MCQComponent from "../UserAssessment/Uncompleted/MCQComponent";
import MarksComponent from "../UserAssessment/Uncompleted/MarksComponent";
import useDeleteQuestion from "../../hooks/useDeleteQuestion";

const Question = ({ questionPaperId, onBack }) => {
  const { data, loading, error } = useFetchQuestions();
  const { deleteQuestionPaper, loading: deleting } = useDeleteQuestion(); // Use delete hook
  const [questions, setQuestions] = useState([]);

  const foundPaper = data?.find(
    (paper) => paper.questionPaperId === questionPaperId
  );

  useEffect(() => {
    if (foundPaper) {
      setQuestions([
        ...foundPaper.mcqQuestions || [],
        ...foundPaper.twoMarkQuestions || [],
        ...foundPaper.tenMarkQuestions || [],
      ]);
    }
  }, [foundPaper]);

  const handleRemove = async () => {
    if (!questionPaperId) return;
    
    await deleteQuestionPaper(questionPaperId); // Delete from Firestore
    onBack(); // Navigate back after deletion
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Flex direction="column" p={4}>
      <Flex width="100%" justify="space-between" mb={4}>
        <Button onClick={onBack} colorScheme="gray">
          Back
        </Button>
        <Button colorScheme="red" onClick={handleRemove} isLoading={deleting}>
          Remove All
        </Button>
      </Flex>

      {/* Displaying all questions */}
      {questions.length === 0 ? (
        <Text>No questions available.</Text>
      ) : (
        questions.map((question) => (
          <Box key={question.id} mb={4}>
            {question.type === "MCQ" ? (
              <MCQComponent question={question} />
            ) : (
              <MarksComponent question={question} />
            )}
          </Box>
        ))
      )}
    </Flex>
  );
};

export default Question;
