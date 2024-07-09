import { create } from "zustand";


interface StoreState {
  activeSection: number;
  activeSectionDashboard: number;
  setActiveSection: (section: number) => void;
  setActiveSectionDashboard: (section: number) => void;
}

const useStore = create<StoreState>((set) => ({
  activeSection: 1,
  setActiveSection: (section) => set({ activeSection: section }),
  activeSectionDashboard: 1,
  setActiveSectionDashboard: (sectionDashboard) => set({ activeSectionDashboard: sectionDashboard }),
}));

export default useStore;
