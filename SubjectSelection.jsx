import { Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import useAuthStore from './Client/src/store/authStore'; // Import Zustand store

const SubjectSelection = () => {
  const { selectedStandard } = useAuthStore();
  const[showOptions,setShowOption] = useState()// Access selected standard from Zustand store

  // Define subject options for each standard
  const subjectOptions = {
    "10th": ["Maths", "Science"],
    "12th": ["Botany", "Zoology", "Chemistry", "Physics"],
  };

  // Default to an empty array if no matching standard is found
  const options = subjectOptions[selectedStandard] || [];

  const onOptionSelect = (option) => {
    console.log(`Selected subject: ${option}`);
  };

  return (
    <>
      <Text 
        fontSize="xl" 
        fontWeight="bold" 
        color="black" 
        mb={2}
      >
        All Subjects
      </Text>
      
      <Stack spacing={3} alignItems="center">
        {options.map((option) => (
          <Text
            key={option}
            onClick={() => onOptionSelect(option)}
            cursor="pointer"
            _hover={{ color: "red", fontWeight: "bold" }}
            transition="all 0.2s ease-in-out"
          >
            {option}
          </Text>
        ))}
      </Stack>
    </>
  );
};

export default SubjectSelection;
