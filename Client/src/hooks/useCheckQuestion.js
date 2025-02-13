import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useCheckQuestion = (questionPaperId) => {
  const [attended, setAttended] = useState(false);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const checkAttendanceAndScore = async (userId) => {
      setLoading(true);
      setError(null);

      try {
        const userDocRef = doc(db, "users", userId); // Reference to user document
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const attendedQuestionPapers = userData.attendedQuestions || [];

          // Check if questionPaperId is attended
          const attendedIndex = attendedQuestionPapers.findIndex(
            (q) => q.questionPaperId === questionPaperId
          );

          if (attendedIndex !== -1) {
            setAttended(true);
            const paperScore = attendedQuestionPapers[attendedIndex].score;
            setScore(paperScore !== undefined && paperScore !== null ? paperScore : "No Score");
          } else {
            setAttended(false);
            setScore("No Score");
          }
        } else {
          setError("User document not found");
        }
      } catch (err) {
        console.error("Error fetching attended questions and score:", err);
        setError("Failed to check attendance and score");
      } finally {
        setLoading(false);
      }
    };

    // Listen for authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        checkAttendanceAndScore(user.uid);
      } else {
        setAttended(false);
        setScore("No Score");
        setError("User not authenticated");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup authentication listener
  }, [questionPaperId]);

  return { attended, score, loading, error };
};

export default useCheckQuestion;
