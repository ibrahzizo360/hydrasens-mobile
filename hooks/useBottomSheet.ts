import { create } from 'zustand';

interface BottomSheetState {
  isVisible: boolean;
  toggleVisibility: (isVisible: boolean) => void;
}

const useBottomSheetStore = create<BottomSheetState>((set) => ({
  isVisible: false,
  toggleVisibility: (isVisible: boolean) => set({ isVisible }),
}));

export default useBottomSheetStore;
