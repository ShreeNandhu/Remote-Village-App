import { Box, Button, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { useState } from "react"; // Import useState
import TwoandTenAnswers from "./TwoandTenAnswers";
import StudentsList from "./StudentsList"; // Import the component you want to render
import MCQAnswers from "./MCQAnswer";

const Layout = () => {
  const [showStudentList, setShowStudentList] = useState(false); // State to track rendering

  // Handle click to render the component
  const handleBackClick = () => {
    setShowStudentList(true); // Set state to true when button is clicked
  };

  const selection = ["MCQ", "Two Marks", "Ten Marks"];

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
            <Text fontSize="xl" fontWeight="bold">
              Student Name
            </Text>

            {/* Center Content */}
            <Stack direction="row" spacing={3} align="center">
              {selection.map((s) => (
                <Box key={s} textAlign="center">
                  {/* Label (MCQ, Two Marks, Ten Marks) */}
                  <Text fontSize="lg" mb={2}>
                    {s}
                  </Text>

                  {/* Box under each label */}
                  <Box
                    bg="white"
                    p={4}
                    w="100px"
                    borderRadius="md"
                    border="4px solid green"
                  />
                </Box>
              ))}
            </Stack>
          </Flex>

          {/* Divider */}
          <Divider
            orientation="horizontal"
            borderColor="black.500"
            borderWidth="2px"
            mb={3}
          />

          {/* Two and Ten Marks Answers */}
          <MCQAnswers questionName="Multiple Choice Question" />
          <TwoandTenAnswers questionName="Two Marks" />
          <TwoandTenAnswers questionName="Ten Marks" />
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
