import React from 'react'
import PageLayout from '../Layouts/PageLayout'
import SubjectSelection from '../components/Syllabus/SubjectSelection'
import SubjectMaterials from '../components/Syllabus/SubjectMaterials'


const Syllabus = () => {
  return (
    <>
    <PageLayout sidebar={<SubjectSelection/>} main={<SubjectMaterials/>}/>
    </>
  )
}

export default Syllabus