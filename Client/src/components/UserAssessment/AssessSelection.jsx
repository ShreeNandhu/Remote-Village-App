import { Stack, Text } from '@chakra-ui/react';

const AssessSelection = ({ onOptionSelect }) => {
  const options = ["Completed", "Uncompleted"];

  return (
    <>
      <Text 
        fontSize="xl" 
        fontWeight="bold" 
        color={"black"}
        mb={2} 
       
      >
        Assessment
      </Text>
      
      <Stack spacing={3} alignItems={"center"}>
        {options.map((option) => (
          <Text 
            key={option} 
            onClick={() => onOptionSelect(option)}  // Call prop function
            cursor="pointer" 
            _hover={{ color:"blue.500",fontWeight:"bold"}}
            transition={"all"}
          >
            {option}
          </Text>
        ))}
      </Stack>
    </>
  );
};

export default AssessSelection;
