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
          place_name: "라마다프라자 제주호텔",
          address_name: "테스트 주소C",
          x: "126.51809364015251",
          y: "33.51878081111122",
        },
        {
          place_name: "제주카페스르륵",
          address_name: "테스트 주소DAY2 A",
          x: "126.463259298039",
          y: "33.2322645302471",
        },
        {
          place_name: "제주맛집",
          address_name: "테스트 주소C",
          x: "126.715697062663",
          y: "33.5536047720057",
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
          address_name: "제주특별자치도 서귀포시 색달동 2476-3",

          place_name: "제주 서귀포 중문 갈치조림 맛집 이조은식당",

          x: "126.41611869624526",
          y: "33.25507874842121",
        },
        {
          address_name: "제주특별자치도 서귀포시 표선면 토산리 423-3",

          place_name: "제주갈치맛집 영목이네",

          x: "126.78366323682805",
          y: "33.306468773509394",
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
