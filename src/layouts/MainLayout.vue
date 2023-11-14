<script setup>
import TheHeader from "components/common/TheHeader.vue";
import TheFooter from "components/common/TheFooter.vue";
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <TheHeader />

    <q-page-container>
      <router-view />
    </q-page-container>

    <TheFooter />
  </q-layout>
</template>
