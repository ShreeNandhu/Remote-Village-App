import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import StudentsList from "./StudentsList";
import QuestionComponent from "./QuestionComponent";
import useFetchTestData from "../../hooks/useFetchTestdata";

const CorrectionPage = ({ userId,submission, onBack }) => {
  const [showStudentList, setShowStudentList] = useState(false);
  const { data, loading, error } = useFetchTestData();
  const [studentResponses, setStudentResponses] = useState([]);
  const [totalScore, setTotalScore] = useState(0); // Total score across all questions

  useEffect(() => {
    if (data?.length > 0) {
      const studentData = data.find((student) => student.userId === userId);
      const submissionData = data.find((test) => test.testSubmit === submission);
      if (studentData && submissionData) {
        setStudentResponses(submissionData.responses || []);
      }
    }
  }, [data, userId]);

  // Function to update the total scoreDa
  const updateTotalScore = (scoreChange) => {
    setTotalScore((prevTotal) => prevTotal + scoreChange);
  };

  const handleSubmit = () => {
    console.log("Final Score:", totalScore);
    alert(`Total Score Submitted: ${totalScore}`);
  };

  if (loading) return <Text>Loading student responses...</Text>;
  if (error) return <Text color="red.500">Error: {error}</Text>;
  if (!studentResponses.length) return <Text>No responses found.</Text>;

  return (
    <>
      {!showStudentList ? (
        <>
          <Flex direction="row" align="center" justify="space-between" p={4} w="100%">
            <Button onClick={onBack} colorScheme="blue">
              Back
            </Button>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Student Evaluation
            </Text>
            <Box p={2} bg="blue.200" shadow="md" borderRadius="md" fontWeight="bold" fontSize="lg">
              Total Score: {totalScore} {/* Display Running Total */}
            </Box>
          </Flex>
          <Divider orientation="horizontal" borderColor="black.500" borderWidth="2px" mb={3} />

          {studentResponses.map((response, index) => (
            <QuestionComponent
              key={index}
              questionName={`Question ${index + 1}`}
              questions={[{ no: `Q${index + 1}`, question: response?.questionText, answer: response?.userAnswer }]}
              updateTotalScore={updateTotalScore} // Pass function to update total score
            />
          ))}

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button colorScheme="green" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </>
      ) : (
        <StudentsList />
      )}
    </>
  );
};

export default CorrectionPage;
