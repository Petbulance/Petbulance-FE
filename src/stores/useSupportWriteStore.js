import { create } from 'zustand';

export const useSupportWriteStore = create((set) => ({
  title: '',
  content: '',

  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),

  reset: () =>
    set({
      title: '',
      content: '',
    }),
}))
