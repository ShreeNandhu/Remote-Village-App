import { create } from "zustand";

const useAdminStore = create((set) => ({
	admin: JSON.parse(localStorage.getItem("admin-info")),
	login: (admin) => set({ admin }),
	logout: () => set({ admin: null }),
	setAdmin: (admin) => set({ admin }),
}));

export default useAdminStore;
