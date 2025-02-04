import { Flex, Spinner, Center } from "@chakra-ui/react"; // Import Spinner and Center for loading screen
import { useState, useEffect } from "react";
import PageLayout from "../Layouts/PageLayout";
import Completed from "../components/UserAssessment/Completed/Completed";
import Uncompleted from "../components/UserAssessment/Uncompleted/Uncompleted";
import AssessSelection from "../components/UserAssessment/AssessSelection";
import useAuthStore from "../store/authStore";
 // Assuming useAuthStore is the hook for Zustand auth store

const Assessment = () => {
  const loggedUser = useAuthStore((state) => state); // Get the login state from Zustand
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);

  // Simulate loading when the selected option changes
  useEffect(() => {
    if (selectedOption) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // Adjust loading duration as needed
      return () => clearTimeout(timer);
    }
  }, [selectedOption]);

  const renderContent = () => {
    if (loading) {
      return null;
    }

    switch (selectedOption) {
      case "Completed":
        return <Completed />;
      default:
        return <Uncompleted />; // Default to Uncompleted if no option is selected
    }
  };

  if (!loggedUser) {
    return (
      <Center h="100vh">
        <Text>You must be logged in to access this page.</Text>
      </Center>
    ); // If not logged in, display a message or redirect
  }

  return (
    <PageLayout
      sidebar={<AssessSelection onOptionSelect={setSelectedOption} />}
      main={
        <>
          <Flex direction="column" position="relative" alignItems="flex-end"></Flex>
          {renderContent()}
        </>
      }
    />
  );
};

export default Assessment;
