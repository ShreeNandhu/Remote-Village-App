import { Stack, Text } from '@chakra-ui/react';
import React from 'react';
import useFetchDocument from '../../hooks/useFetchDocument';

const SubjectSelection = ({ onSubjectSelect }) => {
  const { documents } = useFetchDocument(); // Fetch all subjects

  const onOptionSelect = (subjectName) => {
    if (subjectName) {
      onSubjectSelect(subjectName); // Pass subject name to parent component
    }
  };

  return (
    <>
      <Text fontSize="xl" fontWeight="bold" color="black" mb={2}>
        All Subjects
      </Text>
      <Stack spacing={3} alignItems="center">
        {documents?.length > 0 ? (
          documents.map((option) => (
            <Text
              key={option.id} 
              onClick={() => onOptionSelect(option.subjectName)} 
              cursor="pointer"
              _hover={{ color: "blue.300", fontWeight: "bold" }}
              transition="all"
            >
              {option.subjectName}
            </Text>
          ))
        ) : (
          <Text color="gray.500">No subjects available.</Text>
        )}
      </Stack>
    </>
  );
};

export default SubjectSelection;
