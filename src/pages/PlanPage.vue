<script setup>
import { ref } from "vue";
import CalendarComponent from "../components/plan/CalendarComponent.vue";
import MapPage from "./MapPage.vue";
import { usePlanStore } from "../stores/plan";

const planStore = usePlanStore();

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
  }
};

const goPrevious = (currentStep) => {
  console.log(currentStep);
  step.value = currentStep - 1;
};
</script>

<template>
  <div>
    <q-layout view="hhh Lpr lFr">
      <q-stepper
        class="container"
        v-model="step"
        ref="stepper"
        color="primary"
        animated
      >
        <q-step :name="1" title="날짜 선택" icon="event" :done="step > 1">
          <CalendarComponent />
        </q-step>

        <q-step :name="2" title="장소 선택" icon="place" :done="step > 2">
          <MapPage />
        </q-step>

        <q-step :name="3" title="숙소 선택" icon="bed" :done="step > 3">
          qwerty
        </q-step>

        <q-step :name="4" title="Create an ad" icon="settings">
          Try out different ad text to see what brings in the most customers,
          and learn how to enhance your ads using features like ad extensions.
          If you run into any problems with your ads, find out how to tell if
          they're running and how to resolve approval issues.
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="goNext(step)"
              color="primary"
              :label="step === 4 ? 'Finish' : '다음'"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="goPrevious(step)"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </q-layout>
  </div>
</template>

<style scoped>
/* .container {
  height: 100vh;
} */
</style>
