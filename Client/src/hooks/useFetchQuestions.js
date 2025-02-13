import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useFetchQuestions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const querySnapshot = await getDocs(collection(db, "QuestionPapers"));
        const fetchedData = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const questionPaperId = doc.id;
          const subject = data.subject || "Unknown Subject";
          const standard = data.standard || "Unknown Standard";
          const board = data.board || "Unknown Board";
          const questionsArray = data.questions || [];

          const formattedQuestions = questionsArray.map((value, index) => ({
            id: index.toString(),
            question: value.question || "No question provided",
            type: value.type || "Unknown Type",
            options: value.type === "MCQ" ? value.options || [] : null,
          }));

          fetchedData.push({
            questionPaperId,
            subject,
            standard,
            board,
            mcqQuestions: formattedQuestions.filter((q) => q.type === "MCQ"),
            twoMarkQuestions: formattedQuestions.filter((q) => q.type === "2 Marks"),
            tenMarkQuestions: formattedQuestions.filter((q) => q.type === "10 Marks"),
          });
        });

        setData(fetchedData);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to fetch questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    // Authenticate and fetch data
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchQuestions();
      } else {
        setData([]);
        setError("User not authenticated");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup function to remove listener
  }, []);

  return { data, loading, error };
};

export default useFetchQuestions;
