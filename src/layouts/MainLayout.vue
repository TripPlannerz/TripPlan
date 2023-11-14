<script setup>
import TheHeader from "components/common/TheHeader.vue";
import TheFooter from "components/common/TheFooter.vue";
import IndexPage from "src/pages/IndexPage.vue";
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <TheHeader /> -->

    <q-page-container>
      <!-- <router-view /> -->
      <IndexPage />
    </q-page-container>

    <TheFooter />
  </q-layout>
</template>

<style>
/* .q-drawer-container:nth-child(1) > .q-drawer--left {
  margin-left: 150px !important;
  background: transparent;
}

.q-drawer-container:nth-child(2) > .q-drawer--left {
  margin-left: 550px !important;
} */
</style>
