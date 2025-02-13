import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { collection, doc, getDocs, query, setDoc, where, serverTimestamp } from "firebase/firestore";
import useShowToast from "./useShowToast";
import { fetchSignInMethodsForEmail } from "firebase/auth";

const useAdminSignUp = () => {
  const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();

  const signup = async (inputs) => {
    // Validate input fields
    if (!inputs.email || !inputs.password || !inputs.username || !inputs.confirmPassword) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }

    // Email validation
    if (!inputs.email.includes("@")) {
      showToast("Email Error", "Please enter a valid email.", "error");
      return;
    }

    // Password match validation
    if (inputs.password !== inputs.confirmPassword) {
      showToast("Password Error", "Passwords do not match.", "error");
      return;
    }

    // Check if the email is already registered
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, inputs.email);
      if (signInMethods.length > 0) {
        showToast("Error", "This email is already registered. Please log in instead.", "error");
        return;
      }
    } catch (error) {
      showToast("Error", "Error checking email availability.", "error");
      return;
    }

    const adminRef = collection(firestore, "admin");

    // Check if username already exists in Firestore
    const q = query(adminRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast("Error", "Username already exists", "error");
      return;
    }

    try {
      // Create user in Firebase Authentication
      const newAdmin = await createUserWithEmailAndPassword(inputs.email, inputs.password);

      if (!newAdmin && error) {
        showToast("Error", error.message, "error");
        return;
      }

      if (newAdmin) {
        // Create the admin document in Firestore with approval set to false
        const adminDoc = {
          uid: newAdmin.user.uid,
          email: inputs.email,
          username: inputs.username,
          role: "admin",
          approved: false, // Not approved initially
          createdAt: serverTimestamp(),
        };

        // Save the admin document to Firestore
        await setDoc(doc(firestore, "admins", newAdmin.user.uid), adminDoc);

        showToast("Admin registered", "You have successfully registered, but not approved.", "warning");
      }
    } catch (error) {
      showToast("Signup Error", error.message, "error");
    }
  };

  return { loading, error, signup };
};

export default useAdminSignUp;
