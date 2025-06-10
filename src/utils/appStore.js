import { create } from "zustand";

export const userStore = create((set) => ({
  name: "user",
  addUser: (state) => set({ user: state }),
  removeUser: () => set({ user: null }),
}));
