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
  const AdminUser = useAdminStore((state) => state.login);

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return showToast("Error", "Please fill all the fields", "error");
    }
    try {
      // Attempt to sign in
      const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

      if (userCred) {
        // Retrieve the admin document from Firestore
        const docRef = doc(firestore, "admins", userCred.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const adminData = docSnap.data();

          // Check if the admin is approved
		  if (adminData?.approved) {
            // Store admin info in localStorage and Zustand store
            localStorage.setItem("admin-info", JSON.stringify(adminData));
            AdminUser(adminData);

            // Navigate to admin dashboard or home page
            navigate("/");
          } else {
            // Deny login if not approved
            return showToast("Error", "Your account is not approved yet. Please contact support.", "error");
          }
        } else {
          // Document not found
          return showToast("Error", "No admin account found. Please contact support.", "error");
        }
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

export default useAdminLogin;
