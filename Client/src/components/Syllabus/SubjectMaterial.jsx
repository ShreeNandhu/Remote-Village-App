import React from 'react';
import { Box, Button, Divider, Flex, Spinner, Stack, Text, VStack } from '@chakra-ui/react';
import useFetchDocument from '../../hooks/useFetchDocument';


const SubjectMaterials = ({ selectedSubject }) => {
  const { documents, loading, error } = useFetchDocument();

  // Filter documents by the selected subject
  const filteredDocuments = selectedSubject
    ? documents.filter(doc => doc.subjectName === selectedSubject.subjectName) // Match subjectName
    : [];

  return (
    <>
      <Text color="blue.300" fontSize="xl" fontWeight={"bold"} mb={2} mt={2}>
        Notes
      </Text>
      <Divider orientation="horizontal" borderColor="black.500" borderWidth="2px" mb={3} />
      <Stack gap={2}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.300" />
          </Box>
        ) : error ? (
          <Text color="red.500">Error fetching papers: {error}</Text>
        ) : (
          filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <Flex
                key={doc.id}
                w="auto"
                h="90px"
                bg="gray.200"
                borderRadius="md"
                _hover={{ shadow: "md" }}
                transition="shadow"
                p={3}
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Text fontSize="3xl" fontWeight="bold">
                  {doc.fileName || "Example File"} {/* Display file name */}
                </Text>

                <VStack flex={1} mx={4} alignItems="center" spacing={0}>
                  <Text fontSize="md" fontWeight="bold" color="gray">
                    Standard:
                  </Text>
                  <Text fontSize="md" color="gray.600">
                    {doc.standard || "Author Name"} {/* Display standard */}
                  </Text>
                </VStack>

                <VStack flex={1} mx={4} alignItems="center" spacing={0}>
                  <Text fontSize="md" fontWeight="bold" color="gray">
                    Board
                  </Text>
                  <Text fontSize="md" color="gray.600">
                    {doc.board || "Board Name"} {/* Display board */}
                  </Text>
                </VStack>

                <Flex>
                  <Button colorScheme="green" mx={1} onClick={() => window.open(doc.url, "_blank")}>
                    Download
                  </Button>
                </Flex>
              </Flex>
            ))
          ) : (
            <Text>Select the Subject ortherwise No documents available for this subject.</Text>
          )
        )}
      </Stack>
    </>
  );
};

export default SubjectMaterials;
