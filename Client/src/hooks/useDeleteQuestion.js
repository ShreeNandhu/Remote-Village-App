import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore, auth } from "../firebase/firebase"; // Import auth for user check
import useShowToast from "./useShowToast";

const useDeleteQuestion = () => {
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();

  const deleteQuestionPaper = async (questionPaperID) => {
    const user = auth.currentUser; // Get the authenticated user

    if (!user) {
      showToast("Error", "You must be logged in to delete a question paper.", "error");
      return;
    }

    if (!questionPaperID) {
      showToast("Error", "Invalid Question Paper Id", "error");
      return;
    }

    setLoading(true);
    try {
      const questionPaperRef = doc(firestore, "QuestionPapers", questionPaperID);
      await deleteDoc(questionPaperRef);
      showToast("Success", "Question Paper deleted successfully", "success");
    } catch (error) {
      showToast("Error", "Failed to delete the Question Paper", "error");
    } finally {
      setLoading(false);
    }
  };

  return { deleteQuestionPaper, loading };
};

export default useDeleteQuestion;
