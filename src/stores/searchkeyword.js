import { defineStore } from "pinia";

export const searchKeywordStore = defineStore("searchkeyword", {
  state: () => ({
    keywordlist: [],
  }),

  getters: {
    getKey(state) {
      return state.keywordlist.value;
    },
  },

  actions: {
    keywordlist(l) {
      this.keywordlist = l;
    },
  },
});
