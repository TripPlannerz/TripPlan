<script setup>
import { ref, onMounted } from "vue";
import { getPlanList } from "src/apis/schedule";

const planlist = ref([]);
onMounted(() => {
  const res = getPlanList().then((res) => {
    console.log(res.data);
    planlist.value = res.data;
    return res.data;
  });
  console.log(planlist.value);
});

const onCardClick = (pid) => {
  console.log(pid, "card clickckckck");
};
</script>

<template>
  <div class="row justify-center q-gutter-sm">
    <q-intersection
      v-for="plan in planlist"
      :key="plan.planId"
      transition="scale"
      class="example-item"
    >
      <q-card class="q-mx-xl" @click="onCardClick(plan.planId)">
        <img src="https://cdn.quasar.dev/img/mountains.jpg" />

        <q-card-section>
          <div class="text-h6">여행지ID #{{ plan.planId }}</div>
          <div class="text-h6">{{ plan.region }}</div>
          <div class="text-subtitle1">{{ plan.userId }}</div>
          <div class="text-subtitle2">
            {{ plan.startDate }} ~ {{ plan.endDate }}
          </div>
        </q-card-section>
      </q-card>
    </q-intersection>
  </div>
</template>

<style scoped>
.example-item {
  height: 390px;
  width: 390px;
}
</style>
