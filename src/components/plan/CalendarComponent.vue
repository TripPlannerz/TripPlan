<script setup>
import stores from "src/stores";
import { ref } from "vue";
import { usePlanStore } from "../../stores/plan";
import PlanPage from "src/pages/PlanPage.vue";

const planStore = usePlanStore();

const setStartDateAfterToday = (dt) => {
  var year = new Date().getFullYear();
  var month = new Date().getMonth() + 1;
  var date = new Date().getDate();
  var today = year + "/" + month + "/" + date;
  return dt >= today;
};

const setDates = (selected) => {
  planStore.dates = selected;
  // 기간 계산
  planStore.days = countDays();
};

const countDays = () => {
  const start = new Date(
    planStore.dates.from.slice(0, 4),
    planStore.dates.from.slice(5, 7),
    planStore.dates.from.slice(8, 10)
  );
  const end = new Date(
    planStore.dates.to.slice(0, 4),
    planStore.dates.to.slice(5, 7),
    planStore.dates.to.slice(8, 10)
  );
  var diff = Math.abs(end.getTime() - start.getTime());
  diff = Math.ceil(diff / (1000 * 3600 * 24));

  return diff;
};
</script>

<template>
  <div class="">
    <div class="q-pa-md">
      <!-- TODO : 캘린더 두개 놓고 왼쪽에서 from, 오른쪽에서 to 설정 가능 하도록   -->
      <q-date
        class="calendar"
        v-model="planStore.dates"
        :options="setStartDateAfterToday"
        range
        @update:model-value="setDates"
        minimal
      />
    </div>
  </div>
</template>

<style scoped>
.calendar {
  width: 50%;
  height: 60vh;
  box-shadow: none;
  border-radius: 0.5rem;
}
</style>
