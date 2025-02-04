import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const showToast = useShowToast();
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return showToast("Error", "Please fill all the fields", "error");
    }
    try {
      const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
        navigate("/");
      }
    } catch (error) {
      // Handle incorrect password or other errors
      if (error.code === "auth/wrong-password") {
        showToast("Error", "Incorrect password. Please try again.", "error");
        console.error("Firebase Error:", error);
      } else if (error.code === "auth/user-not-found") {
        showToast("Error", "No user found with this email. Please check the email or sign up.", "error");
      } else {
        showToast("Error", error.message, "error");
      }

      // Reload the page to reset state after error
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Reload after showing the toast
    }
  };

  return { loading, error, login };
};

export default useLogin;
