<script setup>
import TheMapHeader from "src/components/common/TheMapHeader.vue";

import MapTest from "src/layouts/MapTest.vue";
</script>

<template>
  <q-layout view="hhh Lpr lFr">
    <TheMapHeader />

    <q-page-container>
      <!-- <router-view /> -->
      <MapTest />
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
