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
    <div class="text-h4 text-center q-my-lg">
      다른 사람들의 계획을 확인해보세요.
    </div>
    <Suspense>
      <template #default>
        <ContentsCards />
      </template>
      <template #fallback> loading... </template>
    </Suspense>
  </div>
</template>

<style scoped></style>
