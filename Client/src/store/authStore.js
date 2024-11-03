import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: (() => {
    try {
      const userInfo = localStorage.getItem("user-info");
      return userInfo ? JSON.parse(userInfo) : null;
    } catch {
      return null; // Fallback if JSON parsing fails
    }
  })(),
  
  login: (user) => {
    localStorage.setItem("user-info", JSON.stringify(user)); // Sync with localStorage
    set({ user });
  },

//   logout: () => {
//     localStorage.removeItem("user-info"); // Clear user info from localStorage
//     localStorage.removeItem("token"); // Optionally clear token or other related data
//     set({ user: null });
//   },

//   setUser: (user) => {
//     localStorage.setItem("user-info", JSON.stringify(user)); // Sync with localStorage
//     set({ user });
//   },
}));

export default useAuthStore;
