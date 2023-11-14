<script setup>
import stores from "src/stores";
import { ref } from "vue";
import { usePlanStore } from "../../stores/plan";

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
};
</script>

<template>
  <div>
    <div class="q-pa-md">
      <!-- TODO : 캘린더 두개 놓고 왼쪽에서 from, 오른쪽에서 to 설정 가능 하도록   -->
      <q-date
        class="calendar"
        v-model="planStore.dates"
        :options="setStartDateAfterToday"
        range
        title="여행 기간을 설정하세요."
        subtitle="_"
        @update:model-value="setDates"
      />
    </div>
  </div>
</template>

<style scoped>
/* TODO : 이거 왜 안 먹혀..? 콘솔에서 먹히는데... */
.q-date__header {
  display: none;
}

.calendar {
  width: 50%;
  height: 60vh;
  box-shadow: none;
  border-radius: 0.5rem;
}
</style>
