import { create } from 'zustand';

import api from '@/apis/api.jsx';

export const useSupportWriteStore = create((set, get) => ({
  title: '',
  content: '',
  submitting: false,

  /* ================= setters ================= */
  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),

  setFromInquiry: (inquiry) =>
    set({
      title: inquiry?.title ?? '',
      content: inquiry?.content ?? '',
    }),

  reset: () =>
    set({
      title: '',
      content: '',
    }),

  /* ================= 등록 ================= */
  submit: async (navigate) => {
    const { title, content } = get();
    if (!title.trim() || !content.trim()) return;

    set({ submitting: true });

    try {
      await api.post('/qna', { title, content });
      set({ title: '', content: '' });
      navigate('/index/mypage/support/MyInquiry', { replace: true });
    } finally {
      set({ submitting: false });
    }
  },

  /* ================= 수정 ================= */
  update: async (qnaId) => {
    const { title, content } = get();
    if (!title.trim() || !content.trim()) {
      throw new Error('VALIDATION_ERROR');
    }

    set({ submitting: true });

    try {
      const res = await api.put(`/qna/${qnaId}`, {
        title,
        content,
      });

      return res.data.data; // { qnaId, title, content, updatedAt }
    } finally {
      set({ submitting: false });
    }
  },
}));
