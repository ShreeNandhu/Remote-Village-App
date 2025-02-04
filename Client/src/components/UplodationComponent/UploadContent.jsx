import React from "react";
import {
  Box,
  Text,
  Divider,
  Flex,
  Button,
  Icon,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import useFetchDocument from "../../hooks/useFetchDocument";
import useAdminStore from "../../store/adminStore";
import RemoveUploadModal from "./RemoveUploadModal";
import useRemoveUpload from "../../hooks/useRemoveUpload";

const UploadContent = () => {
  const { admin } = useAdminStore((state) => state);
  const { documents, loading, error, refetchDocuments } =
    useFetchDocument("folderName"); // Use the custom hook with a refetch function
  const userFiles =
    documents?.filter((doc) => doc.adminId === admin?.uid) || [];
  const otherFiles =
    documents?.filter((doc) => doc.adminId !== admin?.uid) || [];

  const {
    isModalOpen,
    fileToRemove,
    isLoading,
    openRemoveModal,
    closeModal,
    removeUpload,
  } = useRemoveUpload(); // Updated to match the hook name

  const handleRemoveAndRefresh = async () => {
    await removeUpload();
    refetchDocuments(); // Trigger re-fetch after file removal
  };

  if (loading) {
    return (
      <>
        <Flex
          justify="center"
          align="center"
          height="100vh"
          direction="column"
          textAlign="center"
        >
          <Spinner color="blue.600" />
          <Text color="blue.500" mt={4}>
            Loading...
          </Text>
        </Flex>
      </>
    );
  }

  if (error) {
    return <Text color="red.500">Failed to fetch documents: {error}</Text>;
  }

  return (
    <>
      {/* Your Uploads Section */}
      <Text color="blue.500" fontWeight="bold" fontSize="xl" mb={4}>
        Your Uploads
      </Text>
      <Divider
        orientation="horizontal"
        borderColor="black.500"
        borderWidth="2px"
        mb={4}
      />
      <Box mx="auto" p={6} bg="gray.50" borderRadius="md" boxShadow="md">
        {userFiles.length > 0 ? (
          <VStack spacing={4} align="stretch">
            {userFiles.map((upload, index) => (
              <Flex
                key={index}
                justify="space-between"
                align="center"
                bg="white"
                p={4}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                boxShadow="sm"
              >
                <Flex align="center" gap={4}>
                  <Icon as={FiFile} boxSize={6} color="red.400" />
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      {upload.subjectName}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Standard: {upload.standard} | Board: {upload.board}
                    </Text>
                  </Box>
                </Flex>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() =>
                    openRemoveModal(
                      upload.fileStorageLocation,
                      upload.subjectName,
                      upload.fileId
                    )
                  }
                  isLoading={isLoading}
                >
                  Remove
                </Button>
              </Flex>
            ))}
          </VStack>
        ) : (
          <Text color="gray.500">No uploads found for your account.</Text>
        )}
      </Box>

      {/* Other Uploads Section */}
      <Text color="blue.500" fontWeight="bold" fontSize="xl" mt={8} mb={4}>
        Other Uploads
      </Text>
      <Divider
        orientation="horizontal"
        borderColor="black.500"
        borderWidth="2px"
        mb={4}
      />
      <Box mx="auto" p={6} bg="gray.50" borderRadius="md" boxShadow="md">
        {otherFiles.length > 0 ? (
          <VStack spacing={4} align="stretch">
            {otherFiles.map((upload, index) => (
              <Flex
                key={index}
                justify="space-between"
                align="center"
                bg="white"
                p={4}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                boxShadow="sm"
              >
                <Flex align="center" gap={4}>
                  <Icon as={FiFile} boxSize={6} color="teal.400" />
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      {upload.subjectName}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Standard: {upload.standard} | Board: {upload.board}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            ))}
          </VStack>
        ) : (
          <Text color="gray.500">No other uploads available.</Text>
        )}
      </Box>

      {/* Modal for Confirmation */}
      {isModalOpen && (
        <RemoveUploadModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleRemoveAndRefresh} // Call the re-fetch after remove
          fileName={fileToRemove?.fileName}
        />
      )}
    </>
  );
};

export default UploadContent;
