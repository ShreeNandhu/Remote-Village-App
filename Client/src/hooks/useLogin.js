import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";


const useLogin = () => {
  const showToast = useShowToast();
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
  
  const { setUser } = useAuthStore(); // Zustand store function

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return showToast("Error", "Please fill all the fields", "error");
    }

    try {
      // Sign in with email and password
      const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);
      if (!userCred) return;

      // Fetch user data from Firestore
      const docRef = doc(firestore, "users", userCred.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        // Store user info in Zustand store
        setUser(userData);

        // Navigate to user dashboard
        navigate("/");
      } else {
        return showToast("Error", "No user account found. Please contact support.", "error");
      }
    } catch (error) {
      // Handle specific Firebase auth errors
      if (error.code === "auth/wrong-password") {
        showToast("Error", "Incorrect password. Please try again.", "error");
      } else if (error.code === "auth/user-not-found") {
        showToast("Error", "No user found with this email. Please check the email or sign up.", "error");
      } else {
        showToast("Error", error.message, "error");
      }
    }
  };

  return { loading, error, login };
};

export default useLogin;
