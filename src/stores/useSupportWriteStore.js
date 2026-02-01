import { create } from 'zustand';

import api from '@/apis/api.jsx';

export const useSupportWriteStore = create((set, get) => ({
  title: '',
  content: '',
  submitting: false,

  /* ===== setters ===== */
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  reset: () => set({ title: '', content: '' }),

  /* ===== submit ===== */
  submit: async (navigate) => {
    const { title, content } = get();
    if (!title.trim() || !content.trim()) return;

    set({ submitting: true });

    try {
      await api.post('/qna', { title, content });
      set({ title: '', content: '' });
      navigate('/index/mypage/support/myinquiry', { replace: true });
    } finally {
      set({ submitting: false });
    }
  },
}));
