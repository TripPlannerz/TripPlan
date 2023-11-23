<script setup>
import { ref, onMounted, onUpdated, watchEffect } from "vue";
import { VueDraggableNext as draggable } from "vue-draggable-next";
import { usePlanStore } from "../../stores/plan";
import { useSearchKeywordStore } from "../../stores/searchkeyword";

const planStore = usePlanStore();
const keyStore = useSearchKeywordStore();
// CHECKLIST : sample data

const places = ref([]);

const planData = ref();
const infos = ref([]);
onMounted(() => {
  places.value = [];
  // keyStore.addlist = data;
  keyStore.splitList();
  console.log(keyStore.savedlist, "여기뭐야???????????????");
  planData.value = keyStore.savedlist;
  console.log(planData.value, "PD");
  // console.log(places);
  // console.log(accommodations);
});

watchEffect(() => {
  infos.value = planStore.tripinfo;
  places.value = keyStore.extralist;
  console.log(places.value, keyStore.extralist, "============================");
  console.log(infos.value, "SDJKFIJAEGFUIHN");
  let temp = keyStore.getExtraList;
  console.log(temp, "이거이거이거이거이거이거");

  // 추가로 필요한 로직 수행
});

const enabled = ref(true);

const dragging = ref(false);

const add = () => {
  console.log("add");
};
const replace = () => {
  console.log("replace");
};
const checkMove = (event) => {
  console.log("checkMove", event.draggedContext);
  console.log("Future index: " + event.draggedContext.futureIndex);

  keyStore.savedlist = planData.value;
  console.log("!!!!!!", keyStore.savedlist);
};
const log = (event) => {
  const { moved, added } = event;

  if (moved) console.log("moved", moved);
  if (added) console.log("added", added, added.element);
};
</script>

<template>
  <div class="">
    <!-- <div class="text-h3 q-ma-sm">{{ planStore.places.region }}</div>
    <div class="text-h5">
      {{ planStore.dates.from }} - {{ planStore.dates.to }}
    </div> -->

    <!-- places -->

    <div class="overlay-container">
      <div class="relative-position flex mx-10">
        <div class="container q-mx-lg q-my-sm">
          <div class="text-center q-my-sm">장소</div>
          <draggable
            class="dragArea list-group w-full"
            :list="places"
            :group="{ name: 'people' }"
            :sort="true"
            @change="log"
            :move="checkMove"
          >
            <q-card class="q-ma-sm" v-for="place in places" :key="place.id">
              <q-card-section>
                {{ place.place_name }}
              </q-card-section>
            </q-card>
          </draggable>
        </div>

        <!-- accommodations -->
        <div
          class="container q-mx-lg q-my-sm"
          v-for="day in planData"
          :key="planData.indexOf(day)"
        >
          <div class="text-center q-my-sm">
            DAY {{ planData.indexOf(day) + 1 }}
          </div>
          <div v-if="infos.length !== 0 || infos.value !== undefined">
            <div class="q-ma-sm">
              택시요금 : {{ infos[planData.indexOf(day)].taxifare }}
            </div>
            <div class="q-ma-sm">
              거리 : {{ infos[planData.indexOf(day)].distance / 1000 }} Km
            </div>
            <div class="q-ma-sm">
              소요시간 :
              {{ Math.round(infos[planData.indexOf(day)].duration / 60) }}
              분
            </div>
          </div>
          <div v-else>
            <div class="q-ma-sm">택시요금 :</div>
            <div class="q-ma-sm">거리 : Km</div>
            <div class="q-ma-sm">소요시간 : 분</div>
          </div>

          <draggable
            class="dragArea list-group w-full"
            :list="planData[planData.indexOf(day)]"
            group="people"
            @change="log"
            :move="checkMove"
          >
            <q-card
              class="q-ma-sm"
              v-for="plan in planData[planData.indexOf(day)]"
              :key="planData[planData.indexOf(day)].indexOf(plan)"
            >
              <q-card-section>
                {{ plan.place_name }}
              </q-card-section>
            </q-card>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: #f7f8f9;
  border-radius: 0.5rem;
  min-width: 200px;
  min-height: 150px;
}

.item-attribute {
  padding: 10px;
  border: 1px solid black;
}
.clone-grid {
  display: flex;
}
</style>
