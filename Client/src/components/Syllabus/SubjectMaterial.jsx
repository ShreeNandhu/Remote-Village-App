import React from 'react';
import { Box, Button, Divider, Flex, Spinner, Stack, Text, VStack } from '@chakra-ui/react';
import useFetchDocument from '../../hooks/useFetchDocument';

const SubjectMaterials = ({ selectedSubject }) => {
  const { documents, loading, error } = useFetchDocument();

  // Ensure documents are not undefined before filtering
  const filteredDocuments = selectedSubject && documents
    ? documents.filter(doc => doc.subjectName?.toLowerCase() === selectedSubject.toLowerCase()) // Case-insensitive match
    : [];

  return (
    <>
      <Text color="blue.300" fontSize="xl" fontWeight="bold" mb={2} mt={2}>
        Notes
      </Text>
      <Divider orientation="horizontal" borderColor="black.500" borderWidth="2px" mb={3} />
      <Stack gap={2} overflow={"auto"}>
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
              w="100%"
              maxW="100%"
              h="90px"
              bg="gray.100"
              borderRadius="md"
              _hover={{ shadow: "lg" }}
              transition="all 0.2s ease-in-out"
              p={4}
              alignItems="center"
              justifyContent="space-between"
            >
              {/* Left - File Name */}
              <Text fontSize="lg" fontWeight="bold" flex="1" noOfLines={1}>
                {doc.fileName || "Example File"}
              </Text>
        
              {/* Center - Standard */}
              <VStack flex="1" align="center" spacing={0}>
                <Text fontSize="sm" fontWeight="bold" color="gray.500">
                  Standard
                </Text>
                <Text fontSize="sm" color="gray.700">
                  {doc.standard || "N/A"}
                </Text>
              </VStack>
        
              {/* Center - Board */}
              <VStack flex="1" align="center" spacing={0}>
                <Text fontSize="sm" fontWeight="bold" color="gray.500">
                  Board
                </Text>
                <Text fontSize="sm" color="gray.700">
                  {doc.board || "N/A"}
                </Text>
              </VStack>
        
              {/* Right - Download Button */}
              <Button
                colorScheme="green"
                size="sm"
                onClick={() => window.open(doc.url, "_blank")}
              >
                Download
              </Button>
            </Flex>
            ))
          ) : (
            <Text color="gray.600" fontStyle="italic">
              {selectedSubject ? "No documents available for this subject." : "Select a subject to view documents."}
            </Text>
          )
        )}
      </Stack>
    </>
  );
};

export default SubjectMaterials;

