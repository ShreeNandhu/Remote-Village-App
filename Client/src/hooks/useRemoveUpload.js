import { useState } from "react";
import { ref, deleteObject } from "firebase/storage"; // Firebase Storage methods
import useShowToast from "./useShowToast";
import { auth, firestore, storage } from "../firebase/firebase"; // Firebase initialization
import { deleteDoc, doc } from "firebase/firestore";

const useRemoveUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToRemove, setFileToRemove] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const showToast = useShowToast();

  const extractFileName = (path) => path.substring(path.lastIndexOf("/") + 1).trim();

  const openRemoveModal = (fileStorageLocation, fileName, fileId) => {
    setFileToRemove({ fileStorageLocation, fileName, fileId});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const removeUpload = async () => {
    if (!fileToRemove) return;

    const { fileStorageLocation, fileName, fileId } = fileToRemove;
    const currentUserId = auth.currentUser?.uid;
    
   
    if (currentUserId) {
      try {
        setIsLoading(true);

        // Delete the file from Firebase Storage
        const fileRef = ref(storage, fileStorageLocation);
        await deleteObject(fileRef);

        // Log to ensure fileId is passed correctly
        

        // Delete the document from Firestore
        const documentRef = doc(firestore, "documents", fileId);
        await deleteDoc(documentRef);

        // Show success toast
        showToast("Successful", "Document removed successfully", "success");

        // Close modal after removal
        setIsModalOpen(false);
      } catch (error) {
        const errorMessage = error.message || "An unknown error occurred.";
        showToast("Failure", `Failed to remove document: ${errorMessage}`, "error");
      } finally {
        setIsLoading(false);
      }
    } else {
      showToast("Failure", "You can only delete your own documents.", "error");
    }
  };

  return {
    isModalOpen,
    fileToRemove,
    isLoading,
    openRemoveModal,
    closeModal,
    removeUpload,
  };
};

export default useRemoveUpload;
