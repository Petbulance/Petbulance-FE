import { create } from 'zustand';

export const useSupportInquiryStore = create((set) => ({
  currentInquiry: null,

  setInquiry: (inquiry) =>
    set({ currentInquiry: inquiry }),

  clearInquiry: () =>
    set({ currentInquiry: null }),
}))
