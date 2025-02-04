import { Stack, Text } from '@chakra-ui/react';
import React from 'react';
import useFetchDocument from '../../hooks/useFetchDocument';

const SubjectSelection = ({ onSubjectSelect }) => {
  // Assuming useFetchDocument fetches all documents
  const { documents } = useFetchDocument(); 

  // Define the function to handle selection
  const onOptionSelect = (option) => {
    onSubjectSelect(option); // Pass the selected subject back to the parent
  };

  return (
    <>
      <Text fontSize="xl" fontWeight="bold" color={"black"} mb={2}>
        All Subjects
      </Text>
      <Stack spacing={3} alignItems={"center"}>
        {documents.map((option) => (
          <Text 
            key={option.id} 
            onClick={() => onOptionSelect(option)}  // Call onOptionSelect when a subject is clicked
            cursor="pointer" 
            _hover={{ color:"blue.300", fontWeight:"bold" }}
            transition={"all"}
          >
            {option.subjectName} {/* Display the subject name */}
          </Text>
        ))}
      </Stack>
    </>
  );
};

export default SubjectSelection;
