import { useState } from "react";
import { doc, updateDoc, addDoc, setDoc, collection, getFirestore } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";

const useSubmitAnswers = (questionPaperId, questions) => {
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const showToast = useShowToast();

  const db = getFirestore();
  const user = useAuthStore((state) => state.user);
  const uid = user?.uid;

  // Handle answer change
  const handleAnswerChange = (value, questionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Submit answers to Firebase
  const handleSubmit = async () => {
    if (!uid) {
      showToast("Error", "No user account found. Please contact support.", "error");
      return;
    }

    try {
      // Create a reference for the new document with an auto-generated ID
      const docRef = doc(collection(db, "testSubmissions"));

      const testSubmissionId = docRef.id; // Get the generated document ID

      const submissionData = {
        testSubmissionId, // Store the ID inside the document
        userId: uid,
        questionPaperId,
        responses: questions.map((q) => ({
          questionId: q.id,
          questionText: q.question,
          userAnswer: answers[q.id] || "",
        })),
        score: "", // Empty score initially
        timestamp: new Date(),
      };

      // Save the document with the specified ID
      await setDoc(docRef, submissionData);

      // Update user's attended questions in Firestore
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        attendedQuestions: [
          ...(user.attendedQuestions || []), // Keep previous attended questions
          { testSubmissionId, score: "", questionPaperId },
        ],
      });

      setIsCompleted(true);
      showToast("Success", "Your answers have been submitted successfully!", "success");
    } catch (error) {
      console.error("Submission Error:", error);
      showToast("Error", "Failed to submit answers. Please try again.", "error");
    }
  };

  return {
    answers,
    isCompleted,
    handleAnswerChange,
    handleSubmit,
  };
};

export default useSubmitAnswers;
