import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase"; // Adjust paths as needed
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import useShowToast from "./useShowToast";


const useSignUp = () => {
  const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();

  const signup = async (inputs) => {
    if (!inputs.email || !inputs.password || !inputs.username || !inputs.district || !inputs.board || !inputs.confirmPassword) {
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

    const usersRef = collection(firestore, "users");

    // Check if username already exists
    const q = query(usersRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast("Error", "Username already exists", "error");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);

      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          district: inputs.district,
          board: inputs.board,
          attendedQuestions: [],
          role: "user",
        };

        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        showToast("User registered", "You have successfully registered!", "success");
      }
    } catch (error) {
      showToast("Signup Error", error.message, "error");
    }
  };

  return { loading, error, signup };
};

export default useSignUp;
