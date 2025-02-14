import { useEffect, useState } from "react";
// Import your Firebase configuration
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useUserScore = (userId) => {
  const [grade, setGrade] = useState("-");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserScore = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const userRef = doc(firestore, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const attendedQuestions = userData.attendedQuestions || [];

          if (attendedQuestions.every(question => question.score === "")) {
            setGrade("-");
          } else {
            const totalScore = attendedQuestions.reduce((acc, question) => acc + (Number(question.score) || 0), 0);
            const totalPossibleScore = attendedQuestions.length * 100; // Assuming max score per question is 1
            const percentage = totalPossibleScore ? (totalScore / totalPossibleScore) * 100 : 0;

            let grade = "";
            if (percentage >= 90) grade = "O";
            else if (percentage >= 70) grade = "A+";
            else if (percentage >= 50) grade = "B+";
            else if (percentage >= 30) grade = "C+";
            else grade = "F";

            setGrade(grade);
          }
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchUserScore();
  }, [userId]);

  return { grade, loading, error };
};

export default useUserScore;