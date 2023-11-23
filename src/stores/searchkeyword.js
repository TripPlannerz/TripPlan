import { defineStore } from "pinia";

export const useSearchKeywordStore = defineStore("searchkeyword", {
  state: () => ({
    keywordlist: [],
    addlist: [],
    savedlist: [],
    clickflag: false,
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

    getSavedList() {
      return this.savedlist;
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
    splitList() {
      this.selectedlist = this.addlist.map((item) => ({
        place_name: item.place_name,
        category_group_code: item.category_group_code,
        id: item.id,
        x: item.x,
        y: item.y,
      }));

      console.log(this.selectedlist, "*&%$%^&UHJNJSAHDVGHAHSDBJASDHNJ");
    },
  },
});
