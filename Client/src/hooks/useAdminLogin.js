import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../store/adminStore";

const useAdminLogin = () => {
  const showToast = useShowToast();
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
  
  const { setAdmin } = useAdminStore(); // Zustand store function

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return showToast("Error", "Please fill all the fields", "error");
    }

    try {
      // Sign in with email and password
      const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

      if (!userCred) return;

      // Fetch admin data from Firestore
      const docRef = doc(firestore, "admins", userCred.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const adminData = docSnap.data();

        if (adminData?.approved) {
          // Store admin info in Zustand store and localStorage
          setAdmin(adminData);

          // Navigate to admin dashboard
          navigate("/");
        } else {
          return showToast("Error", "Your account is not approved yet. Please contact support.", "error");
        }
      } else {
        return showToast("Error", "No admin account found. Please contact support.", "error");
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

export default useAdminLogin;
