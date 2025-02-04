import { create } from "zustand";
import { createUserSlice } from "../slices/userSlice";
import { createStandardSlice } from "../slices/standardSlice";

const useAuthStore = create((set) => ({
  ...createUserSlice(set),
  ...createStandardSlice(set),
}));

export default useAuthStore;
