import React, { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Button,
  Icon,
  Divider,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { FiUploadCloud } from "react-icons/fi";
import useDocumentManagement from "../../hooks/useDocumentManagement"; // Import the custom hook
import useShowToast from "../../hooks/useShowToast";

const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [standard, setStandard] = useState("");
  const [board, setBoard] = useState("");
  const { uploadDocument, loading, error } = useDocumentManagement();
  const showToast = useShowToast(); // Destructure hook methods

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (fileName) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) {
      alert("No files selected for upload.");
      return;
    }

    if (!subjectName || !standard || !board) {
      alert("Please fill all the required fields.");
      return;
    }

    try {
      const uploadPromises = uploadedFiles.map((file) =>
        uploadDocument(
          {
            subjectName,
            standard,
            board,
          },
          file
        )
      );

      await Promise.all(uploadPromises);
      showToast("Upload Successful", "All documents have been uploaded.", "success");
      setUploadedFiles([]);
      setSubjectName("");
      setStandard("");
      setBoard("");
    } catch (err) {
      showToast("Upload Failed", "There was an error uploading documents.", "error");
    }
  };

  return (
    <>
      <Text color="blue.500" fontWeight="bold" fontSize="xl" mb={2}>
        Upload
      </Text>
      <Divider orientation="horizontal" borderColor="black.500" borderWidth="2px" />
      <Box p={6} bg="gray.50" borderRadius="md" boxShadow="md" maxW="full" mx="auto" m={2}>
        {/* Subject Name Input */}
        <FormControl mb={4} isRequired>
          <FormLabel fontWeight="bold">Subject Name</FormLabel>
          <Input
            placeholder="Enter subject name"
            focusBorderColor="red.400"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
        </FormControl>

        {/* Standard Select */}
        <FormControl mb={4} isRequired>
          <FormLabel fontWeight="bold">Standard</FormLabel>
          <Select
            placeholder="Select standard"
            focusBorderColor="red.400"
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
          >
            <option value="10th">10th</option>
            <option value="11th">11th</option>
            <option value="12th">12th</option>
            <option value="All">All</option>
          </Select>
        </FormControl>

        {/* Board Select */}
        <FormControl mb={4} isRequired>
          <FormLabel fontWeight="bold">Board</FormLabel>
          <Select
            placeholder="Select Board"
            focusBorderColor="red.400"
            value={board}
            onChange={(e) => setBoard(e.target.value)}
          >
            <option value="CBSE">CBSE</option>
            <option value="Stateboard">Stateboard</option>
            <option value="All">All</option>
          </Select>
        </FormControl>

        {/* Drag-and-Drop Upload Box */}
        <Box
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
          border="2px dashed red"
          borderRadius="md"
          p={6}
          textAlign="center"
          mb={4}
          bg="red.50"
          _hover={{ bg: "red.100" }}
          cursor="pointer"
          position="relative"
        >
          <Icon as={FiUploadCloud} boxSize={10} color="red.400" />
          <Text mt={2} fontSize="lg" color="red.600">
            Drag and drop your files here
          </Text>
          <Text fontSize="sm" color="red.500">
            or click to upload
          </Text>
          <Input
            type="file"
            multiple
            position="absolute"
            opacity={0}
            top={0}
            left={0}
            w="100%"
            h="100%"
            cursor="pointer"
            onChange={handleFileUpload}
          />
        </Box>

        {/* Uploaded Files Menu */}
        {uploadedFiles.length > 0 && (
          <Box border="1px solid" borderColor="gray.300" borderRadius="md" p={4} bg="white">
            <Text fontWeight="bold" mb={2}>
              Uploaded Files:
            </Text>
            <Flex direction="column" gap={2}>
              {uploadedFiles.map((file, index) => (
                <Flex
                  key={index}
                  justify="space-between"
                  align="center"
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  py={1}
                >
                  <Text fontSize="sm" color="gray.600">
                    {file.name}
                  </Text>
                  <Button size="xs" colorScheme="red" onClick={() => removeFile(file.name)}>
                    Remove
                  </Button>
                </Flex>
              ))}
            </Flex>
          </Box>
        )}

        {/* Submit Button */}
        <Flex justify="center" mt={4}>
          <Button colorScheme="red" size="md" onClick={handleSubmit} isLoading={loading}>
            Submit
          </Button>
        </Flex>

        {/* Display error if there is one */}
        {error && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            <AlertTitle>Error: {error}</AlertTitle>
          </Alert>
        )}
      </Box>
    </>
  );
};

export default Upload;