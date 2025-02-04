import React from 'react';
import PageLayout from "../Layouts/PageLayout";
import AdProfile from '../components/ProfileComponent/AdProfile';
import UsProfile from '../components/ProfileComponent/UsProfile';
 // Import the user profile component

const Profilepage = () => {
  // Get the role from localStorage
  const role = localStorage.getItem('role');

  return (
    <PageLayout 
      main={
        role === 'admin' ? <AdProfile /> : <UsProfile /> // Render AdProfile for admin, USProfile for user
      } 
    />
  );
};

export default Profilepage;
