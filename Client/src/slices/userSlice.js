export const createUserSlice = (set) => ({
    user: JSON.parse(localStorage.getItem("user-info")) || null, // Default to null if no user in localStorage
    login: (user) => set({ user }),
    logout: () => set({ user: null }),
    setUser: (user) => set({ user })
  });
  
  