import React, { useState } from 'react'
import PageLayout from '../Layouts/PageLayout'
import UPageSelection from '../components/UplodationComponent/UPageSelection';
import Upload from '../components/UplodationComponent/Upload';
import UploadContent from '../components/UplodationComponent/UploadContent';

const Uploadation = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const renderContent = () => {
    switch (selectedOption) {
      case "Upload":
        return <Upload />;
      default:
        return <UploadContent />;
    }
  }
  return (
    <>
    <PageLayout sidebar={<UPageSelection onOptionSelect={setSelectedOption}/>} main={renderContent()}/>
    </>
  )
}

export default Uploadation