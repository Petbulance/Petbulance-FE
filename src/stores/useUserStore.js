// src/stores/useUserStore.js
import { create } from 'zustand';

import api from '@/apis/api.jsx';

const useUserStore = create((set, get) => ({
  profile: null,
  loading: false,

  /* =========================
     내 프로필 조회
  ========================= */
  fetchMyProfile: async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      set({ profile: null });
      return;
    }

    set({ loading: true });

    try {
      const res = await api.get('/users/me');
      set({
        profile: res.data.data,
        loading: false,
      });
      console.log('zs', res.data.data);
    } catch (e) {
      console.error(e);
      set({
        profile: null,
        loading: false,
      });
    }
  },

  /* =========================
     로그아웃
  ========================= */
  clearProfile: () => {
    set({ profile: null });
  },
}));

export default useUserStore;
