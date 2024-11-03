// src/hooks/useLogin.js
import { useState } from "react";
import axios from "axios";
import useShowToast from "./useShowToast"; // Import your toast hook
import useAuthStore from "../store/authStore"; // Import Zustand store for auth state
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const showToast = useShowToast(); // Initialize the toast function
  const loginUser = useAuthStore((state) => state.login);
  const navigate = useNavigate();// Zustand login action

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError(""); // Reset error before making the request
    try {
      const response = await axios.post("http://localhost:5000/loginuser", {
        email: inputs.email,
        password: inputs.password,
      });
      showToast("Login successful", "You have successfully logged in!", "success");
      // Update Zustand store with user data
      loginUser(response.data.user);
      // Store token or user data as needed
      localStorage.setItem("user-info", JSON.stringify(response.data.user));
      navigate("/");
    } catch (err) {
      // Display error in a toast notification
      const errorMessage = err.response?.data?.message || "Something went wrong";
      showToast("Login failed", errorMessage, "error");
      setError(errorMessage);
    }
  };

  return {
    inputs,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;
