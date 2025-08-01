import { create } from 'zustand';

const useControlStore = create((set) => ({
  controls: {
    audio: true,
    video: true,
    attendees: true,
    chat: true,
    share: true,
    materials: true,
    react: true,
    raise: true,
    end: true,
  },
  setControlVisibility: (controlKey, isVisible) =>
    set((state) => ({
      controls: {
        ...state.controls,
        [controlKey]: isVisible,
      },
    })),
}));
export default useControlStore;
