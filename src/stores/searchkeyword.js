import { defineStore } from "pinia";

export const searchKeywordStore = defineStore("searchkeyword", {
  state: () => ({
    keywordlist: ["강릉"],
  }),

  getters: {
    getKey(state) {
      return state.keywordlist.value;
    },
  },

  actions: {
    savewordlist(l) {
      this.keywordlist = l;
    },
  },
});
