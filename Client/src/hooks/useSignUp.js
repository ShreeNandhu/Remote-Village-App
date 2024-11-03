import { useState } from "react";
import axios from "axios";
import useShowToast from "./useShowToast"; // Adjust the import path

const useSignUp = () => {
  const showToast = useShowToast();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    district: "",
    board: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Password match validation
    if (inputs.password !== inputs.confirmPassword) {
      showToast("Password Error", "Passwords do not match.", "error");
      setLoading(false);
      return;
    }

    // Email validation
    if (!inputs.email.includes("@")) {
      showToast("Email Error", "Please enter a valid email.", "error");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        username: inputs.username,
        email: inputs.email,
        district: inputs.district,
        board: inputs.board,
        password: inputs.password,
      });

      // Show success toast on successful registration
      showToast(
        "User registered",
        "You have successfully registered!",
        "success"
      );
    } catch (error) {
      // Show error toast on catch
      if (error.response) {
        showToast(
          "Signup Error",
          error.response.data.message || "An error occurred during signup.",
          "error"
        );
      } else {
        showToast("Error", error.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    inputs,
    error: null, // No need to manage error state in the hook
    loading,
    handleChange,
    handleSubmit,
  };
};

export default useSignUp;
