import React from "react";
import PageLayout from "../Layouts/PageLayout";
import AdProfile from "../components/ProfileComponent/AdProfile";
import UsProfile from "../components/ProfileComponent/UsProfile";
import useAdminStore from "../store/adminStore";

const ProfilePage = () => {
  const { admin } = useAdminStore((state) => state);

  return <PageLayout main={admin ? <AdProfile /> : <UsProfile />} />;
};

export default ProfilePage;
