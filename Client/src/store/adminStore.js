import { create } from "zustand";

const useAdminStore = create((set) => ({
  admin: JSON.parse(localStorage.getItem("admin-info")) || null, // Load from localStorage on init
  setAdmin: (admin) => {
    localStorage.setItem("admin-info", JSON.stringify(admin)); // Save to localStorage
    set({ admin });
  },
  logout: () => {
    localStorage.removeItem("admin-info"); // Remove admin data
    set({ admin: null });
  },
}));

export default useAdminStore;
