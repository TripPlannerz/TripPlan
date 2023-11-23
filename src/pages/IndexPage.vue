<script setup>
import CarouselComponent from "src/components/main/CarouselComponent.vue";
import ContentsComponent from "components/main/ContentsComponent.vue";
import TheHeadingNavbar from "src/components/common/TheHeadingNavbar.vue";
</script>

<template>
  <TheHeadingNavbar />

  <!-- Carousel -->
  <CarouselComponent />
  <!-- 컨텐츠 -->
  <ContentsComponent />
</template>

<style scoped lang="css">
.container {
  z-index: 5000;
}
</style>
