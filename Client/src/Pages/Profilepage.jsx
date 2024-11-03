import React from 'react'
import PageLayout from "../Layouts/PageLayout"
import ProfileComponent from '../components/ProfileComponent/ProfileComponent';
const Profilepage = () => {
  return (
    <>
    <PageLayout main={<ProfileComponent/>} />
    </>
  )
}

export default Profilepage