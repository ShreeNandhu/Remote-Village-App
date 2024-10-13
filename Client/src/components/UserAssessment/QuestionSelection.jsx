import { Stack, Text } from '@chakra-ui/react';

const QuestionSelection = ({ onOptionSelect }) => {
  const options = ["MCQ", "Two Marks", "Ten Marks"];

  return (
    <>
      <Text 
        fontSize="xl" 
        fontWeight="bold" 
        color={"black"}
        mb={2} 
      >
        Total Questions
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

export default QuestionSelection;
