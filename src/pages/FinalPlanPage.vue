<script setup>
import TheMapHeader from "src/components/common/TheMapHeader.vue";
import MapRoutePage from "./MapRoutePage.vue";
import EditPlan from "src/components/plan/EditPlan.vue";
import TheFinalHeader from "src/components/common/TheFinalHeader.vue";
defineProps({
  step: Number,
});
</script>

<template>
  <div>
    <q-layout view="hHh lpR fFf">
      <TheFinalHeader :step="step" />

      <q-page-container>
        <!-- <router-view /> -->

        <MapRoutePage />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style scoped></style>
