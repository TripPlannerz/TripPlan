<script setup>
import { ref, onMounted, onUpdated, watchEffect } from "vue";
import { VueDraggableNext as draggable } from "vue-draggable-next";
import { usePlanStore } from "../../stores/plan";
import { useSearchKeywordStore } from "../../stores/searchkeyword";

const planStore = usePlanStore();
const keyStore = useSearchKeywordStore();
// CHECKLIST : sample data
const data = [
  {
    address_name: "제주특별자치도 서귀포시 색달동 2476-3",
    category_group_code: "FD6",
    category_group_name: "음식점",
    category_name: "음식점 > 한식 > 해물,생선",
    distance: "",
    id: "9947817",
    phone: "064-738-7123",
    place_name: "제주 서귀포 중문 갈치조림 맛집 이조은식당",
    place_url: "http://place.map.kakao.com/9947817",
    road_address_name: "제주특별자치도 서귀포시 천제연로 97",
    x: "126.41611869624526",
    y: "33.25507874842121",
    savetype: "places",
  },
  {
    address_name: "제주특별자치도 서귀포시 표선면 토산리 423-3",
    category_group_code: "FD6",
    category_group_name: "음식점",
    category_name: "음식점 > 한식 > 해물,생선",
    distance: "",
    id: "483930986",
    phone: "010-3157-0828",
    place_name: "제주갈치맛집 영목이네",
    place_url: "http://place.map.kakao.com/483930986",
    road_address_name: "제주특별자치도 서귀포시 표선면 일주동로6455번길 21",
    x: "126.78366323682805",
    y: "33.306468773509394",
    savetype: "places",
  },
  {
    address_name: "제주특별자치도 제주시 구좌읍 동복리 719-1",
    category_group_code: "FD6",
    category_group_name: "음식점",
    category_name: "음식점 > 간식 > 떡,한과",
    distance: "",
    id: "1701775963",
    phone: "070-8745-8785",
    place_name: "제주맛집",
    place_url: "http://place.map.kakao.com/1701775963",
    road_address_name: "제주특별자치도 제주시 구좌읍 동복로 85",
    x: "126.715697062663",
    y: "33.5536047720057",
    savetype: "places",
  },
  {
    address_name: "제주특별자치도 제주시 삼도이동 1254",
    category_group_code: "AD5",
    category_group_name: "숙박",
    category_name: "여행 > 숙박 > 호텔 > 특급호텔 > 라마다호텔",
    distance: "",
    id: "15292731",
    phone: "064-729-8100",
    place_name: "라마다프라자 제주호텔",
    place_url: "http://place.map.kakao.com/15292731",
    road_address_name: "제주특별자치도 제주시 탑동로 66",
    x: "126.51809364015251",
    y: "33.51878081111122",
    savetype: "places",
  },
  {
    address_name: "제주특별자치도 서귀포시 색달동 2812-4",
    category_group_code: "AD5",
    category_group_name: "숙박",
    category_name: "여행 > 숙박 > 호텔 > 특급호텔 > 롯데호텔",
    distance: "",
    id: "7862728",
    phone: "064-731-1000",
    place_name: "롯데호텔 제주",
    place_url: "http://place.map.kakao.com/7862728",
    road_address_name: "제주특별자치도 서귀포시 중문관광로72번길 35",
    x: "126.410600157083",
    y: "33.2484564531332",
    savetype: "places",
  },
];

const places = ref([]);

const planData = ref([]);
const infos = ref([]);
onMounted(() => {
  places.value = [];
  // keyStore.addlist = data;
  keyStore.splitList();

  keyStore.selectedlist.map((item) => {
    if (item.category_group_code === "AD5") {
      planData.value.push([{ ...item }]);
    } else {
      places.value.push(item);
    }
  });

  console.log(planData, "PD");
  // console.log(places);
  // console.log(accommodations);
});

watchEffect(() => {
  infos.value = planStore.tripinfo;
  console.log(infos.value, "SDJKFIJAEGFUIHN");

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
        <div class="container">
          <div>places</div>
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

        <!-- accommodationsd -->
        <div
          class="container q-mx-lg q-my-sm"
          v-for="day in planData"
          :key="planData.indexOf(day)"
        >
          DAY {{ planData.indexOf(day) + 1 }}<br />
          <div v-if="infos.length !== 0">
            택시요금 : {{ infos[planData.indexOf(day)].taxifare }}<br />
            거리 :{{ infos[planData.indexOf(day)].distance / 1000 }} Km<br />
            소요시간 :{{
              Math.round(infos[planData.indexOf(day)].duration / 60)
            }}
            분 <br />
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
}

.item-attribute {
  padding: 10px;
  border: 1px solid black;
}
.clone-grid {
  display: flex;
}
</style>
