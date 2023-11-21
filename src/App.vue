<script setup>
import { RouterView } from "vue-router";
import MainLayout from "./layouts/MainLayout.vue";
</script>

<template>
  <div id="app">
    <router-view></router-view>
    <!-- <MainLayout /> -->
  </div>
</template>

<style>
#app {
  height: 100%;
  background-color: #f4f4f4;
}

* {
  border: 0 solid #3e4549;
}

.q-card {
  box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07),
    0 10px 20px -2px rgba(0, 0, 0, 0.04);
  border-radius: 0.5rem;
}
</style>
