import PageLayout from "../Layouts/PageLayout"
import SubjectMaterials from "../components/Syllabus/SubjectMaterials"

const Homepage = () => {
  return (
    <>
    <PageLayout main={<SubjectMaterials/>}/>
    </>
  )
}

export default Homepage