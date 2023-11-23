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
  await getPlanDetail(pid).then((res) => {
    console.log(res.data);
    planstore.title = res.data.title;
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
  <div
    class="row justify-between q-mx-sm q-gutter-sm"
    style="width: 70%; margin: auto"
  >
    <!-- <div class="q-pa-md" style="max-width: 350px">
      <q-intersection
        v-for="plan in planlist"
        :key="plan.planId"
        transition="scale"
        class="example-item"
      >
        <q-list
          dense
          bordered
          padding
          class="rounded-borders example-item"
          style="background-color: #ffffff"
        >
          <q-item clickable v-ripple @click="onCardClick(plan.planId)">
            <q-item-section>
              <div class="row items-center">
                <q-img
                  class="q-mr-sm q-my-sm"
                  src="public/images/list.png"
                  style="height: 30px; max-width: 30px"
                />
                <div class="row">
                  <div class="text-h6 text-weight-bold">#{{ plan.planId }}</div>
                  <div class="text-h6 text-weight-bold q-mx-sm">
                    {{ plan.region }}
                  </div>
                </div>
              </div>
              <div class="text-h5 text-weight-bold" style="color: #0c356a">
                {{ plan.title }}
              </div>
              <div
                class="text-subtitle2 text-weight-bold"
                style="color: #0c356a"
              >
                {{ plan.startDate }} ~ {{ plan.endDate }}
              </div>
              <div class="text-right">
                <div class="text-subtitle1 inline-block q-pt-sm q-px-sm">
                  작성자 :
                </div>

                <div class="text-subtitle1 inline-block" style="color: #404040">
                  {{ plan.userId }}
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-intersection>
    </div> -->
    <!--  -->

    <q-intersection
      v-for="plan in planlist"
      :key="plan.planId"
      transition="scale"
      class="example-item"
    >
      <q-card class="q-mx-md" @click="onCardClick(plan.planId)">
        <q-card-section>
          <div>
            <div class="row items-center">
              <q-img
                class="q-mr-sm q-my-sm"
                src="public/images/list.png"
                style="height: 30px; max-width: 30px"
              />
              <div class="row">
                <div class="text-h6 text-weight-bold">#{{ plan.planId }}</div>
                <div class="text-h6 text-weight-bold q-mx-sm">
                  {{ plan.region }}
                </div>
              </div>
            </div>
            <div class="text-subtitle2 text-weight-bold" style="color: #0c356a">
              {{ plan.startDate }} ~ {{ plan.endDate }}
            </div>
            <div>
              <div class="text-subtitle1 inline-block q-pt-sm">작성자 :</div>
              <div class="text-subtitle1 inline-block" style="color: #404040">
                {{ plan.userId }}
              </div>
            </div>
            <div class="flex justify-end">
              <q-btn flat>자세히 보기 ></q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-intersection>
  </div>
</template>

<style scoped>
.q-list {
  box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07),
    0 10px 20px -2px rgba(0, 0, 0, 0.04);
  border-radius: 0.5rem;
}
.example-item {
  /* height: 390px;
  */
  width: 40%;
}
</style>
