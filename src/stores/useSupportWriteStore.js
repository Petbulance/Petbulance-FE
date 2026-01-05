import { create } from 'zustand';

export const useSupportWriteStore = create((set) => ({
  title: '',
  content: '',

  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),

  setFromInquiry: (inquiry) =>
    set({
      title: inquiry.title,
      content: inquiry.content,
    }),

  reset: () =>
    set({
      title: '',
      content: '',
    }),
}))
