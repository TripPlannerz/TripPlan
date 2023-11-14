import { defineStore } from "pinia";

export const searchKeywordStore = defineStore("searchkeyword", {
  state: () => ({
    keywordlist: ["강릉"],
    addlist: [],
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
    saveaddlist(a) {
      this.addlist.push(a);
    },
    removeaddlist(i) {
      if (i >= 0 && i < this.addlist.length) {
        this.addlist.splice(i, 1);
      }
    },
  },
});
