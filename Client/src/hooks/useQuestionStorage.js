import { useState } from "react";
import { doc, setDoc, getFirestore, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const useQuestionStorage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Retrieve admin ID from Firebase Auth
  const auth = getAuth();
  const adminId = auth.currentUser?.uid || "unknown-admin";
  const db = getFirestore(); // Initialize Firestore

  const saveQuestion = async ({ question, questionType, mcqOptions, questionPaperId, subject }) => {
    if (!question || !questionType || !questionPaperId || !subject) {
      throw new Error("Question, question type, questionPaperId, and subject are required.");
    }

    setLoading(true);
    setError(null);

    try {
      // Generate a unique question ID
      const questionId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;

      // Prepare the new question object
      const newQuestion = {
        id: questionId,
        question,
        type: questionType,
        options: questionType === "MCQ" ? mcqOptions : null,
        createdAt: new Date().toISOString(),
      };

      // Reference to the specific "Question Paper" document in Firestore
      const questionPaperRef = doc(db, "QuestionPapers", questionPaperId);

      // Fetch the existing document to update or create new question field
      const questionPaperDoc = await getDoc(questionPaperRef);

      if (questionPaperDoc.exists()) {
        // If the document exists, update it by adding a new question
        await updateDoc(questionPaperRef, {
          questions: [...questionPaperDoc.data().questions, newQuestion],
        });
      } else {
        // If the document doesn't exist, create it with the adminId and the first question
        await setDoc(questionPaperRef, {
          adminId,
          questionPaperId,
          subject, // Add subject to the question paper document
          questions: [newQuestion], // Initialize with first question
        });
      }

      // Store the question paper ID in the admin's document
      const adminDocRef = doc(db, "admins", adminId);
      const adminDoc = await getDoc(adminDocRef);

      if (adminDoc.exists()) {
        // If the admin document exists, update it with the new question paper ID
        await updateDoc(adminDocRef, {
          questionPapers: adminDoc.data().questionPapers
            ? [...new Set([...adminDoc.data().questionPapers, questionPaperId])]
            : [questionPaperId],
        });
      } else {
        // If the admin document doesn't exist, create it with the question paper ID
        await setDoc(adminDocRef, {
          adminId,
          questionPapers: [questionPaperId],
        });
      }

      return { success: true, questionId };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { saveQuestion, loading, error };
};

export default useQuestionStorage;
