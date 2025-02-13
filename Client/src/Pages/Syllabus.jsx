import React, { useState } from 'react';
import { Center, Text } from '@chakra-ui/react'; // For error handling when not logged in
import PageLayout from '../Layouts/PageLayout';
import useAuthStore from '../store/authStore';
import SubjectSelection from '../components/Syllabus/SubjectSelection';
import SubjectMaterials from '../components/Syllabus/SubjectMaterial';
 // Use the Zustand store for user authentication

const Syllabus = () => {
  const { user } = useAuthStore((state) => state); // Access the logged-in user from the store

  // Track the selected subject
  const [selectedSubject, setSelectedSubject] = useState(null);

  // If the user is not logged in, render a message
  if (!user) {
    return (
      <Center h="100vh">
        <Text>You must be logged in to access this page.</Text>
      </Center>
    );
  }

  return (
    <PageLayout
      sidebar={<SubjectSelection onSubjectSelect={setSelectedSubject} />} // Pass the setter to SubjectSelection
      main={<SubjectMaterials selectedSubject={selectedSubject} />} // Pass the selectedSubject to SubjectMaterials
    />
  );
};

export default Syllabus;
