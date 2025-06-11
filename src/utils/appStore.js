import { create } from "zustand";

export const userStore = create((set) => ({
  name: "user",
  addUser: (data) => set({ user: data }),
  removeUser: () => set({ user: null }),
}));

export const feedStore = create((set) => ({
  feed: [],
  addFeed: (data) => set({ feed: data }),
  removeFeed: () => set({ feed: null }),
}));

export const connectionsStore = create((set) => ({
  connections: [],
  updateConnections: (data) => set({ connections: data }),
}));

export const requestsStore = create((set) => ({
  requests: [],
  updateRequests: (data) => set({ requests: data }),
  removeRequests: (data) =>
    set((state) => {
      return {
        requests: state?.requests?.filter(
          (item) => item.fromUserId._id !== data
        ),
      };
    }),
}));
