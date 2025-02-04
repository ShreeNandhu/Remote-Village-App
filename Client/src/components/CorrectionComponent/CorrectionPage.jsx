import { Box, Button, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react"; // Import useState
import StudentsList from "./StudentsList"; // Import the component you want to render
import QuestionComponent from "./QuestionComponent";

const Layout = () => {
  const [showStudentList, setShowStudentList] = useState(false); // State to track rendering
  const [totalScores, setTotalScores] = useState({});
  // Handle click to render the component
  const handleBackClick = () => {
    setShowStudentList(true); // Set state to true when button is clicked
  };
  const handleScoresUpdate = useCallback((section, scores) => {
    setTotalScores((prev) => ({ ...prev, [section]: scores }));
  }, []);
  const calculateTotalScore = () => {
    return Object.values(totalScores).reduce((total, sectionScores) => {
      return (
        total +
        Object.values(sectionScores).reduce((acc, score) => acc + score, 0)
      );
    }, 0);
  };
  
  const questionsMCQ = [
    { no: "Q1", question: "What is 2+2?", answer: "4" },
    { no: "Q2", question: "What is the capital of France?", answer: "Paris" },
  ];
  
  const questionsTwoMarks = [
    { no: "Q1", question: "What is 2+2?", answer: "4" },
    { no: "Q2", question: "What is the capital of France?", answer: "Paris" },
  ];

  return (
    <>
      {!showStudentList ? ( // Conditionally render layout or StudentList
        <>
          <Flex
            direction="row"
            align="center"
            justify="space-between"
            p={4}
            w="100%"
          >
            {/* Back Button */}
            <Button colorScheme="blue" onClick={handleBackClick}>
              Back
            </Button>

            {/* Student Name */}
            <Text fontSize="xl" fontWeight="bold" textAlign={"center"}>
              Student Name
            </Text>
            <Box
              p={2}
              bg="blue.200"
              shadow="md"
              borderRadius="md"
              fontWeight="bold"
              fontSize="lg"
            >
               Total Score: {calculateTotalScore()}
            </Box>
          </Flex>

          {/* Divider */}
          <Divider
            orientation="horizontal"
            borderColor="black.500"
            borderWidth="2px"
            mb={3}
          />

          <QuestionComponent
            questionName="Multiple Choice Questions"
            questionType="MCQ"
            questions={questionsMCQ}
            handleScoresUpdate={(scores) => handleScoresUpdate("MCQ", scores)}
          />
          <QuestionComponent
            questionName="Two Marks"
            questionType="Text"
            questions={questionsTwoMarks}
            handleScoresUpdate={(scores) => handleScoresUpdate("Text", scores)}
          />
          <Box display="flex" justifyContent={"flex-end"} mt={2}>
            <Button colorScheme="green">Done</Button>
          </Box>
        </>
      ) : (
        <StudentsList /> // Render StudentList if showStudentList is true
      )}
    </>
  );
};

export default Layout;
