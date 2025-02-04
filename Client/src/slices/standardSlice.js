export const createStandardSlice = (set) => ({
  selectedStandard: "10", // Default to "10"
  setStandard: (standard) => set({ selectedStandard: standard }),
});
