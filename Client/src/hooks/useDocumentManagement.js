import { useState } from "react";
import { collection, addDoc, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, firestore } from "../firebase/firebase";

const useDocumentManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if the admin is authenticated
  const isAuthenticated = !!auth.currentUser?.uid;
  const adminId = auth.currentUser?.uid; // Get the adminId (uid of the authenticated user)
  const storage = getStorage();

  if (!isAuthenticated) {
    return {
      error: "Admin not authenticated.",
      uploadDocument: () => console.error("Admin not authenticated."),
      fetchAdminDocuments: () => console.error("Admin not authenticated."),
      loading: false,
    };
  }

  /**
   * Upload a single document to Firebase Storage and save metadata to Firestore.
   * @param {Object} documentData - Metadata to save in Firestore (e.g., title, description).
   * @param {File} file - File to be uploaded.
   */
  const uploadDocument = async (documentData, file) => {
    if (!isAuthenticated) {
      console.error("Admin is not authenticated.");
      return; // Abort if not authenticated
    }

    setLoading(true);
    setError(null);

    try {
      // Upload the file to Firebase Storage
      const fileRef = ref(storage, `documents/${file.name}`);
      await uploadBytes(fileRef, file); // Upload the file to Firebase Storage

      // Store the storage location (file path) in Firestore
      const fileStorageLocation = fileRef.fullPath;

      // Use addDoc to automatically generate the document ID (fileId)
      const collectionRef = collection(firestore, "documents");
      const docRef = await addDoc(collectionRef, {
        ...documentData,
        adminId,
        fileName: file.name,
        fileStorageLocation, // Save the location of the file
      });

      // Optionally, if you want to update the document with the fileId after it's created
      const fileId = docRef.id; // Firestore automatically generates an ID for the document

      // Now update the document with the fileId
      const documentRef = doc(firestore, "documents", fileId); // Get the document reference
      await updateDoc(documentRef, {
        fileId, // Set the unique fileId in the document
      });
    } catch (err) {
      setError(err.message || "Error uploading document.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch all documents associated with the authenticated admin from Firestore.
   */
  const fetchAdminDocuments = async () => {
    if (!isAuthenticated) {
      return []; // Return an empty array if not authenticated
    }

    setLoading(true);
    setError(null);

    try {
      const collectionRef = collection(firestore, "documents");
      const adminQuery = query(collectionRef, where("adminId", "==", adminId));
      const querySnapshot = await getDocs(adminQuery);

      // Map over the querySnapshot to extract data
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      setError(err.message || "Error fetching documents.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadDocument,
    fetchAdminDocuments,
    loading,
    error,
  };
};

export default useDocumentManagement;
