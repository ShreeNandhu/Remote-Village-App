import { useState, useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { collection, query, getDocs } from "firebase/firestore";
import { firestore, storage, auth } from "../firebase/firebase";

const useFetchDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // Ensure the admin is authenticated
        if (!auth.currentUser?.uid) {
          setError("Admin not authenticated");
          setLoading(false);
          return;
        }

        setLoading(true);

        // Query Firestore for documents
        const q = query(collection(firestore, "documents"));
        const querySnapshot = await getDocs(q);

        // Process documents and fetch download URLs
        const documentsData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const { fileStorageLocation, subjectName, boardOfEducation, fileName } = data;
            

            // Skip invalid entries silently
            if (!fileStorageLocation || fileStorageLocation.trim() === "") {
              return null;
            }

            try {
              const fileRef = ref(storage, fileStorageLocation);
              const url = await getDownloadURL(fileRef);
              const fileName = fileStorageLocation.split('/').pop().split('.')[0];
              return { 
                ...data, 
                url, 
                subjectName, 
                boardOfEducation, 
                fileName,
              };
            } catch (err) {
              // Skip documents with missing files without logging to console
              if (err.code === "storage/object-not-found") {
                return null;
              }
              // Handle other errors silently
              return null;
            }
          })
        );

        // Update state with valid documents
        setDocuments(documentsData.filter((doc) => doc !== null));
      } catch {
        setError("An error occurred while fetching documents.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return { documents, loading, error };
};

export default useFetchDocument;
