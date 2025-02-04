import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useFetchQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    // Fetch questions from Firestore
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "QuestionPapers"));
        let fetchedQuestions = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const questionPaperId = doc.id; // Store question paper ID
          const adminId = data.adminId || null; // Store admin ID

          if (data.questions) {
            let formattedQuestions = Object.entries(data.questions).map(([key, value]) => ({
              id: key, // Unique question ID from Firebase
              questionPaperId, // Store associated question paper ID
              adminId, // Include admin ID
              createdAt: value.createdAt || null,
              options: value.type === "MCQ" ? value.options || [] : null, // Store options only for MCQs
              question: value.question || "No question provided",
              subject: value.subject || "Unknown Subject",
              type: value.type || "Unknown Type",
            }));

            fetchedQuestions = [...fetchedQuestions, ...formattedQuestions];
          }
        });

        setQuestions(fetchedQuestions);
      } catch (err) {
        setError("Failed to fetch questions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state change listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        fetchQuestions(); // Fetch questions only if the user is authenticated
      } else {
        setIsAuthenticated(false);
        setQuestions([]); // Clear questions if the user logs out
        setLoading(false);
        setError("User not authenticated");
      }
    });

    // Clean up the auth listener when the component unmounts
    return () => unsubscribe(); 
  }, []);

  return { questions, loading, error, isAuthenticated };
};

export default useFetchQuestions;
