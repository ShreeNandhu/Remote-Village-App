import { useState, useEffect } from "react";
import { getDoc, doc, collection, query, where, getDocs } from "firebase/firestore"; 
import { firestore } from "../firebase/firebase";
import useAdminStore from "../store/adminStore";

const useFetchTestData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const admin = useAdminStore((state) => state.admin); 

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        if (!admin || !admin.uid) {
          setError("Admin not found or not logged in");
          setLoading(false);
          return;
        }
        
        const adminRef = doc(firestore, "admins", admin.uid);
        const adminSnapshot = await getDoc(adminRef);
        const adminData = adminSnapshot.exists() ? adminSnapshot.data() : null;

        if (!adminData || !adminData.questionPapers?.length) {
          setError("No question papers found for this admin");
          setData([]); // Prevent infinite loading
          setLoading(false);
          return;
        }

        const questionPaperIds = adminData.questionPapers;
        
        // Firebase allows max 10 IDs in "in" queries, split into chunks if needed
        const testData = [];
        for (let i = 0; i < questionPaperIds.length; i += 10) {
          const batchIds = questionPaperIds.slice(i, i + 10);
          const testSubmissionQuery = query(
            collection(firestore, "testSubmissions"),
            where("questionPaperId", "in", batchIds)
          );
          const testSubmissionSnapshot = await getDocs(testSubmissionQuery);

          if (!testSubmissionSnapshot.empty) {
            const batchData = await Promise.all(
              testSubmissionSnapshot.docs.map(async (testDoc) => {
                const testSubmission = testDoc.data();
                const userRef = doc(firestore, "users", testSubmission.userId);
                const userSnapshot = await getDoc(userRef);
                const userData = userSnapshot.exists() ? userSnapshot.data() : null;

                const questionPaperRef = doc(firestore, "QuestionPapers", testSubmission.questionPaperId);
                const questionPaperSnapshot = await getDoc(questionPaperRef);
                const questionPaperData = questionPaperSnapshot.exists() ? questionPaperSnapshot.data() : null;

                return {
                  username: userData?.username || "Unknown",
                  email: userData?.email || "Unknown",
                  subject: questionPaperData?.subject || "Unknown",
                  userId: testSubmission?.userId,
                  responses: testSubmission?.responses || [],
                  testSubmit : testSubmission?.testSubmissionId,
                };
              })
            );
            testData.push(...batchData);
          }
        }

        if (testData.length === 0) {
          setError("No test submissions found");
        }

        setData(testData);
      } catch (err) {
        setError(err.message);
        setData([]); // Prevent infinite loading
      } finally {
        setLoading(false);
      }
    };

    if (admin?.uid) { // Fix dependency issue
      fetchTestData();
    }
  }, [admin]); 

  return { data, loading, error };
};

export default useFetchTestData;
