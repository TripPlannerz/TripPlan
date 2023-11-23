<script setup>
import { ref } from "vue";
import CalendarComponent from "../components/plan/CalendarComponent.vue";
import MapPage from "./MapPage.vue";
import { usePlanStore } from "../stores/plan";
import { useSearchKeywordStore } from "../stores/searchkeyword";
import EditPlan from "src/components/plan/EditPlan.vue";
import MapRoute from "src/layouts/MapRoute.vue";
import FinalPlanPage from "./FinalPlanPage.vue";

const planStore = usePlanStore();
const keyStore = useSearchKeywordStore();

// CHECKLIST : default : 1
const step = ref(1);

const goNext = (currentStep) => {
  if (currentStep === 1) {
    if (
      planStore.dates !== null &&
      planStore.dates.from !== "" &&
      planStore.dates.to !== ""
    ) {
      step.value = currentStep + 1;
      console.log(planStore.dates);
    }
  } else if (currentStep === 2) {
    step.value = currentStep + 1;
    // keyStore.splitList();
  } else if (currentStep === 3) {
    step.value = currentStep + 1;
    // keyStore.splitList();
  }
};

const goPrevious = (currentStep) => {
  console.log(currentStep);
  step.value = currentStep - 1;
};
</script>

<template>
  <div>
    <q-stepper
      class="container"
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        class="stepper"
        :name="1"
        title="날짜 선택"
        icon="event"
        :done="step > 1"
      >
        <CalendarComponent />
      </q-step>

      <q-step
        :name="2"
        title="장소 및 숙소 선택"
        icon="place"
        :done="step > 2"
        style="height: 80vh"
      >
        <MapPage />
      </q-step>

      <q-step
        class="q-pa-none"
        :name="3"
        title="일정 편집"
        icon="edit_calendar"
        :done="step > 3"
        style="height: 80vh"
      >
        <!-- <EditPlan />
          <MapRoute /> -->
        <FinalPlanPage />
      </q-step>

      <!-- <q-step :name="4" title="Create an ad" icon="settings">
        <MapRoute />
      </q-step> -->

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            v-if="step > 1"
            flat
            color="primary"
            @click="goPrevious(step)"
            label="Back"
            class="q-ml-sm q-mt-md"
          />
          <q-btn
            @click="goNext(step)"
            color="primary"
            :label="step === 4 ? 'Finish' : '다음'"
            :class="{
              'float-right': step === 1,
              'q-mx-md': true,
              'q-mt-md': true,
            }"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
}
</style>
