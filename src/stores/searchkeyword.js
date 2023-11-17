import { defineStore } from "pinia";

export const searchKeywordStore = defineStore("searchkeyword", {
  state: () => ({
    keywordlist: [],
    addlist: [],
    savedlist: [
      [
        {
          place_name: "카페A",
          address_name: "테스트 주소",
          x: "126.75086534271406",
          y: "33.433276996414975",
        },
        {
          place_name: "제주그림카페",
          address_name: "테스트 주소B",
          x: "126.300114120852",
          y: "33.3040134941261",
        },
        {
          place_name: "라마다프라자 제주호텔",
          address_name: "테스트 주소C",
          x: "126.51809364015251",
          y: "33.51878081111122",
        },
      ],
      [
        {
          place_name: "제주카페스르륵",
          address_name: "테스트 주소DAY2 A",
          x: "126.463259298039",
          y: "33.2322645302471",
        },
        {
          place_name: "롯데호텔 제주",
          address_name: "테스트 DAY2 B",
          x: "126.410600157083",
          y: "33.2322645302471",
        },
      ],
    ],
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

    getSavedList(day) {
      return this.savedlist[day];
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
