import { ref } from "vue";
import { defineStore } from "pinia";

export const usePlanStore = defineStore("plan", () => {
  // CHECKLIST : default dates
  const dates = ref({ from: "2023/11/20", to: "2023/11/23" });
  const places = ref({});
  const accomodations = ref({});

  return {
    dates,
    places,
    accomodations,
  };
});
