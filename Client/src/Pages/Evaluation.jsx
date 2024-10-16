import React from 'react'
import PageLayout from '../Layouts/PageLayout'
import StudentsList from '../components/AdminAnswer/StudentsList'
import { useState } from 'react'
import EPageSelection from '../components/AdminAnswer/EPageSelection'
import QuestionCreation from '../components/QuestionCreation/QuestionCreation'

const Evaluation = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const renderContent = () => {
    switch (selectedOption) {
      case "Question Creation":
        return <QuestionCreation />;
      default:
        return <StudentsList />;
    }
  }

  return (
    <>
    <PageLayout sidebar={<EPageSelection onOptionSelect={setSelectedOption}/>} main={renderContent()}/>
    </>
  )
}

export default Evaluation