<script setup>
import TheFinalHeader from "src/components/common/TheFinalHeader.vue";

import MapRouteHistoryPage from "src/pages/MapRouteHistoryPage.vue";
</script>

<template>
  <div>
    <q-layout view="hHh lpR fFf">
      <TheFinalHeader />

      <q-page-container>
        <MapRouteHistoryPage />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style scoped></style>
