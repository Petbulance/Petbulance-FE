import { create } from 'zustand';

const useAdminStore = create((set) => ({
  adminProfile: null,

  setAdminProfile: (profile) =>
    set({
      adminProfile: {
        nickname: profile?.nickname ?? '',
        username: profile?.username ?? '',
      },
    }),

  clearAdminProfile: () =>
    set({
      adminProfile: null,
    }),
}));

export default useAdminStore;
