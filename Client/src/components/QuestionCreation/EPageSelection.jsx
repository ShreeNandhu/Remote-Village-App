import { Stack, Text } from "@chakra-ui/react";
import React from "react";

const EPageSelection = ({ onOptionSelect }) => {
  const options = ["Question Creation","Correction",];

  return (
    <>
      <Text fontSize="2xl" fontWeight="bold" color={"black"} mb={2}>
        Menu
      </Text>

      <Stack spacing={3} alignItems={"center"}>
        {options.map((option) => (
          <Text
            key={option}
            onClick={() => onOptionSelect(option)} // Call prop function
            cursor="pointer"
            _hover={{ color: "blue.300", fontWeight: "bold" }}
            transition={"all"}
          >
            {option}
          </Text>
        ))}
      </Stack>
    </>
  );
};

export default EPageSelection;
