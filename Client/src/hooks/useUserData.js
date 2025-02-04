import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const useUserData = () => {
  const [userCount, setUserCount] = useState(null);
  const [userPapers, setUserPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const db = getFirestore();
  const auth = getAuth();

  // Function to fetch user count from Firestore
  const getUserCount = async () => {
    try {
      const usersRef = collection(db, "users");
      const userSnapshot = await getDocs(usersRef);
      setUserCount(userSnapshot.size); // Set user count
    } catch (err) {
      setError("Failed to fetch user count");
    }
  };

  // Function to fetch papers created by the logged-in user
  const getUserPapers = async () => {
    try {
      const userId = auth.currentUser.uid; // Get logged-in user's ID
      if (userId) {
        const adminRef = doc(db, "admins", userId); // Access the admin document for the logged-in user
        const adminDoc = await getDoc(adminRef);
        if (adminDoc.exists()) {
          const paperIds = adminDoc.data().questionPapers; // Assume `papers` field contains an array of paper IDs
          
          // Fetch the actual paper documents
          const papersPromises = paperIds.map(async (paperId) => {
            const paperRef = doc(db, "QuestionPapers", paperId);
            const paperDoc = await getDoc(paperRef);
            return paperDoc.exists() ? paperDoc.data() : null;
          });

          const papers = await Promise.all(papersPromises);
          setUserPapers(papers.filter(paper => paper !== null)); // Set the papers created by the user
        } else {
          setError("Admin data not found");
        }
      } else {
        setError("No user logged in");
      }
    } catch (err) {
      setError("Failed to fetch user papers");
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      getUserCount();
      getUserPapers();
    } else {
      setError("No user logged in");
    }
    setLoading(false);
  }, []);

  return { userCount, userPapers, loading, error };
};

export default useUserData;
