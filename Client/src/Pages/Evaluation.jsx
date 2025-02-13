import React from "react";
import PageLayout from "../Layouts/PageLayout";
import { useState } from "react";
import EPageSelection from "../components/QuestionCreation/EPageSelection";
import QuestionCreation from "../components/QuestionCreation/QuestionCreation";
import StudentsList from "../components/CorrectionComponent/StudentsList";
import TotalQuestions from "../components/QuestionCreation/TotalQuestions";

const Evaluation = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const renderContent = () => {
    switch (selectedOption) {
      case "Question Creation":
        return <QuestionCreation />;
      case "Questions":
        return <TotalQuestions />;
      case "Correction":
        return <StudentsList />;
      default:
        return <StudentsList />;
    }
  };

  return (
    <>
      <PageLayout
        sidebar={<EPageSelection onOptionSelect={setSelectedOption} />}
        main={renderContent()}
      />
    </>
  );
};

export default Evaluation;
