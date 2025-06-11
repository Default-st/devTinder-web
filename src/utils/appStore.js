import { create } from "zustand";

export const userStore = create((set) => ({
  name: "user",
  addUser: (state) => set({ user: state }),
  removeUser: () => set({ user: null }),
}));

export const feedStore = create((set) => ({
  feed: [],
  addFeed: (state) => set({ feed: state }),
  removeFeed: () => set({ feed: null }),
}));
