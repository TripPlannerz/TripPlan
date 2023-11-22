<script setup>
import ContentsCards from "../main/ContentsCards.vue";
// import { ref, onMounted } from "vue";
// import { getPlanList } from "src/apis/schedule";

// const planlist = ref([]);
// onMounted(async () => {
//   const res = await getPlanList().then((res) => {
//     console.log(res.data);
//     planlist.value = res.data;
//     return res.data;
//   });
//   await console.log(planlist.value);
// });
// console.log("BASKET : ", planlist.value);
</script>

<template>
  <div class="q-pa-md">
    <div class="text-h3 text-center q-my-lg">컨텐츠</div>
    <Suspense>
      <template #default>
        <ContentsCards />
      </template>
      <template #fallback> loading... </template>
    </Suspense>
  </div>
</template>

<style scoped>
.example-item {
  height: 390px;
  width: 390px;
}
</style>
