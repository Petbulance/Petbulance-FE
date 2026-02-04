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
  submit: async (navigate, options = {}) => {
    const { title, content } = get();
    if (!title.trim() || !content.trim()) return;

    set({ submitting: true });

    try {
      const res = await api.post('/qna', { title, content });
      const data = res.data.data;
      set({ title: '', content: '' });
      if (options?.onSuccess) {
        options.onSuccess(data);
        return data;
      }

      if (navigate) {
        navigate('/index/mypage/support/MyInquiry', { replace: true });
      }

      return data;
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
