<script setup>
import { ref, onMounted } from "vue";
import { getPlanDetail, getPlanList, getSchedule } from "src/apis/schedule";
import { usePlanStore } from "src/stores/plan";
import { useSearchKeywordStore } from "src/stores/searchkeyword";
import { useRouter } from "vue-router";

const planstore = usePlanStore();
const keystore = useSearchKeywordStore();

const planlist = ref([]);

const router = useRouter();

onMounted(() => {
  const res = getPlanList().then((res) => {
    console.log(res.data);
    planlist.value = res.data;
    return res.data;
  });
  console.log(planlist.value);
});

const onCardClick = async (pid) => {
  console.log(pid, "card clickckckck");
  keystore.clickflag = true;
  await getPlanDetail(pid).then((res) => {
    console.log(res.data);
    planstore.places.region = res.data.region;
    planstore.dates.from = res.data.startDate;
    planstore.dates.to = res.data.endDate;
    planstore.writer = res.data.userName;
    planstore.views = res.data.view;
  });

  await getSchedule(pid).then((res) => {
    console.log(res.data, "RRRRRRRRRRRRR");
    //let temp = res.data.content;

    res.data.map((d) => {
      console.log(d.content, "d.C");

      //console.log(d.content.slice(1, d.content.length - 1).toString, "temp");
      //   keystore.savedlist.push(d.content.slice(1, d.content.length - 1));
      let temp = JSON.parse(d.content);
      console.log(temp, "TEMP");
      keystore.savedlist.push(temp);
      // router.push({ name: "test" });
    });
    let t = keystore.savedlist.flat();
    keystore.addlist = t;
    router.push({ name: "test" });

    //console.log(temp, "SLICKE");
    // temp = temp.substr(1, -1);
    //keystore.savedlist = res.data;
  });

  //planstore.places.region = pid;
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
