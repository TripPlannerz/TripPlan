import { ref } from "vue";
import { defineStore } from "pinia";

export const usePlanStore = defineStore("plan", () => {
  // CHECKLIST : default dates
  const dates = ref({ from: "2023/11/18", to: "2023/11/20" });
  const days = ref(3); // from to 값 date타입으로 바꿔서 날짜 저장 .  =======> 캘린더에서 day 값 저장된거 없나 ???????  일단 직접 저장해서 테스트 중
  const places = ref({ region: "제주" }); //이거 일단 속초로 해두었음 .  메인에서 클릭이나 검색한 지역 여기에 넣으면 됨.
  const tripinfo = ref([]);
  const clearTripInfo = () => {
    tripinfo.value = [];
    console.log("tripINFOOFNOFNOFNO", tripinfo.value);
  };
  const listTripInfo = () => {
    return tripinfo.value;
  };

  return {
    days,
    dates,
    places,
    tripinfo,
    clearTripInfo,
    listTripInfo,
  };
});
