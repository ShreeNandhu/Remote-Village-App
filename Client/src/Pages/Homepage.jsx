import { useNavigate } from "react-router-dom";
import PageLayout from "../Layouts/PageLayout"
import useAuthStore from "../store/authStore";
import { useEffect } from "react";
import WelcomePage from "../components/WelcomePage/WelcomePage";

const Homepage = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);
  return (
    <>
    <PageLayout main={<WelcomePage/>}/>
    </>
  )
}

export default Homepage