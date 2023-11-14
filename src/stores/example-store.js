import { defineStore } from "pinia";

export const searchListStore = defineStore("searchlist", {
  state: () => ({
    searchlist: [],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    savelist(l) {
      this.searchlist = l;
    },
  },
});
