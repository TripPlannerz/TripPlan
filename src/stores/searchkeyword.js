import { defineStore } from "pinia";

export const searchKeywordStore = defineStore("searchkeyword", {
  state: () => ({
    keywordlist: ["강릉"],
    addlist: [],
  }),

  getters: {
    getRooms() {
      let cnt = 0;
      this.addlist.map((i) => {
        if (i.category_group_code === "AD5") {
          cnt++;
        }
        //console.log(i.category_group_code, "PIPIPI");
      });

      return cnt;
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
