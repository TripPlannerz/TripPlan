<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useSearchListStore } from "src/stores/example-store";
import { useSearchKeywordStore } from "src/stores/searchkeyword";
import { usePlanStore } from "src/stores/plan";
import { useQuasar } from "quasar";
import EditPlan from "../plan/EditPlan.vue";

const $q = useQuasar();

const store = useSearchListStore();
const keystore = useSearchKeywordStore();
const planstore = usePlanStore();

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const keyword = ref("");
const miniState = ref(false);

const tab = ref("places"); //d이건 오른쪽 탭
const lefttab = ref("places"); //이게 왼쪽 탭 인데 일단 탭형식으로 남겨놓음
const filterList = ref(["맛집", "카페", "관광지", "호텔", "리조트", "모텔"]);
const roomfilterList = ref(["호텔", "리조트", "모텔"]);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};

const searchPlaces = () => {
  keystore.savewordlist(keyword.value);
};

const drawerClick = (e) => {
  if (miniState.value) {
    miniState.value = false;
    e.stopPropagation();
  }
};

// watchEffect(() => {
//   let tmpcnt = 0;
//   keystore.addlist.map((f) => {
//     if (f[2] === "rooms") {
//       tmpcnt++;
//     }
//     console.log(tmpcnt, "qwerty");
//   });
//   currentRoomCnt.value = tmpcnt;
// });
</script>

<template>
  <q-header class="bg-primary text-white">
    <q-toolbar> </q-toolbar>
  </q-header>

  <q-drawer
    v-model="leftDrawerOpen"
    @click.capture="drawerClick"
    :width="400"
    :breakpoint="400"
    bordered
    side="left"
    show-if-above
  >
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
      <q-item-label header>
        여행지
        <div class="text-h6">{{ planstore.places.region }}</div>
      </q-item-label>

      <q-item-label header>
        여행기간<br />
        {{ planstore.dates.from }} - {{ planstore.dates.to }}
      </q-item-label>
      <div>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </div>

      <q-tabs
        v-model="lefttab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
      >
        <q-tab name="places" label="장소 선택" />
        <!-- <q-tab name="rooms" label="숙소" /> -->
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="lefttab">
        <q-tab-panel name="places">
          <EditPlan />
        </q-tab-panel>
      </q-tab-panels>
    </q-scroll-area>
  </q-drawer>

  <q-drawer
    v-model="rightDrawerOpen"
    @click.capture="drawerClick"
    :width="400"
    :breakpoint="400"
    bordered
    side="right"
    show-if-above
  >
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
      <q-item-label header>
        추가 여행지
        <div class="text-h6">아 맞다 여기도 가야지</div>
      </q-item-label>

      <q-tabs
        v-model="lefttab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
      >
        <q-tab name="places" label="장소 선택" />
        <!-- <q-tab name="rooms" label="숙소" /> -->
      </q-tabs>

      <q-separator />
      <q-input v-model="keyword" filled type="search" hint="Search">
        <template v-slot:append>
          <q-icon name="search" @click="searchPlaces" />
        </template>
      </q-input>

      <q-tab-panels v-model="lefttab">
        <q-tab-panel name="places"> </q-tab-panel>
      </q-tab-panels>
    </q-scroll-area>
  </q-drawer>
</template>

<style lang="css" scoped>
.q-header {
  visibility: hidden;
  height: 1px;
}
.q-btn {
  margin: 10px;
}
</style>
