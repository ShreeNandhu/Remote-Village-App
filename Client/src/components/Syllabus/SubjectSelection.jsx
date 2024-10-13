import { Stack, Text } from '@chakra-ui/react';
import React from 'react'

const SubjectSelection = () => {
    const options = ["Maths", "Science",];

    return (
      <>
        <Text 
          fontSize="xl" 
          fontWeight="bold" 
          color={"black"}
          mb={2} 
        >
          All Subjects
        </Text>
        
        <Stack spacing={3} alignItems={"center"}>
          {options.map((option) => (
            <Text 
              key={option} 
              onClick={() => onOptionSelect(option)}  // Call prop function
              cursor="pointer" 
              _hover={{ color:"red",fontWeight:"bold"}}
              transition={"all"}
            >
              {option}
            </Text>
          ))}
        </Stack>
      </>
    );
  };
  

export default SubjectSelection