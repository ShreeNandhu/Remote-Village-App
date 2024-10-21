import { useState } from "react";
import { Flex } from "@chakra-ui/react"; // Ensure you import Flex
import PageLayout from "../Layouts/PageLayout";
import QuestionSelection from "../components/UserAssessment/QuestionSelection";
import MCQComponent from "../components/UserAssessment/MCQComponent";
import TwoMarksComponent from "../components/UserAssessment/TwoMarkComponent";
import TenMarksComponent from "../components/UserAssessment/TenMarkComponent";
import CountdownTimer from "../utility/CountdownTimer";

const Assessment = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const renderContent = () => {
    switch (selectedOption) {
      case "MCQ":
        return <MCQComponent />;
      case "Two Marks":
        return <TwoMarksComponent />;
      case "Ten Marks":
        return <TenMarksComponent />;
      default:
        return <MCQComponent />; // Default to MCQComponent if no option is selected
    }
  };

  return (
    <>
      <PageLayout
        sidebar={<QuestionSelection onOptionSelect={setSelectedOption} />}
        main={
          <>
            <Flex
              direction="column"
              position="relative"
              alignItems="flex-end"
              
            >
              <Flex mb={2} justifyContent="flex-end" width="100%">
                <CountdownTimer/>
              </Flex>
            </Flex>
            {renderContent()}
          </>
        }
      />
    </>
  );
};

export default Assessment;
