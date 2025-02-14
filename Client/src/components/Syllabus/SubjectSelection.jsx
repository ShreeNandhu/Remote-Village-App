import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import useFetchDocument from "../../hooks/useFetchDocument";

const SubjectSelection = ({ onSubjectSelect }) => {
  const { documents } = useFetchDocument(); // Fetch all subjects

  // Create a Set to filter out duplicate subjects
  const uniqueSubjects = Array.from(
    new Set(documents?.map((doc) => doc.subjectName))
  );

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
        {uniqueSubjects.length > 0 ? (
          uniqueSubjects.map((subject, index) => (
            <Text
              key={index}
              onClick={() => onOptionSelect(subject)}
              cursor="pointer"
              _hover={{ color: "blue.300", fontWeight: "bold" }}
              transition="all"
            >
              {subject}
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
