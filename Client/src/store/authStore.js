import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user-info")) || null, // Load from localStorage on init
  setUser: (user) => {
    localStorage.setItem("user-info", JSON.stringify(user)); // Save to localStorage
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("user-info"); // Remove user data
    set({ user: null });
  },
}));

export default useAuthStore;
