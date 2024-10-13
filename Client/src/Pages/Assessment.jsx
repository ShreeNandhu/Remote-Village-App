import { useState } from "react";
import PageLayout from "../Layouts/PageLayout";
import QuestionSelection from "../components/UserAssessment/QuestionSelection";
import MCQComponent from "../components/UserAssessment/MCQComponent";
import TwoMarksComponent from "../components/UserAssessment/TwoMarkComponent";
import TenMarksComponent from "../components/UserAssessment/TenMarkComponent";

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
        return <MCQComponent/>;
    }
  }
  return (
    <>
      <PageLayout sidebar={<QuestionSelection onOptionSelect={setSelectedOption}/>} main={renderContent()}/>
    </>
  );
};

export default Assessment;
