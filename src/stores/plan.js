import { ref } from "vue";
import { defineStore } from "pinia";

export const usePlanStore = defineStore("plan", () => {
  // CHECKLIST : default dates
  const dates = ref({ from: "2023/11/20", to: "2023/11/23" });
  const places = ref({ region: "속초" }); //이거 일단 속초로 해두었음 .  메인에서 클릭이나 검색한 지역 여기에 넣으면 됨.
  const accomodations = ref({});

  return {
    dates,
    places,
    accomodations,
  };
});
