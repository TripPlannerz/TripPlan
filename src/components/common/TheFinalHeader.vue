<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useSearchListStore } from "src/stores/example-store";
import { useSearchKeywordStore } from "src/stores/searchkeyword";
import { usePlanStore } from "src/stores/plan";
import { useQuasar } from "quasar";
import EditPlan from "../plan/EditPlan.vue";
import EditPlanHistory from "../plan/EditPlanHistory.vue";

const $q = useQuasar();

const store = useSearchListStore();
const keystore = useSearchKeywordStore();
const planstore = usePlanStore();
const route = useRoute(); //이거 지워

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
  console.log(keystore.clickflag, "GGG");
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

const addToAddList = (i) => {
  if (i.category_group_code === "AD5" && keystore.getRooms === planstore.days) {
    $q.notify({
      type: "negative",
      message: "여행일 이상은 추가할 수 없습니다.",
    });
    console.log("여행일 이상은 추가할 수 없습니다.");
  } else {
    keystore.saveextralist(i);
    console.log(i, "HERERERE");
    //i.savetype = tab.value;
    //addList.value.push(i);
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

/* scroll style */
const thumbStyle = {
  right: "4px",
  borderRadius: "5px",
  backgroundColor: "#ffc436",
  width: "5px",
  opacity: 0.75,
};

const barStyle = {
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#ffc436",
  width: "9px",
  opacity: 0.2,
};
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
    <q-item-label header>
      여행지
      <div class="text-h6">{{ planstore.places.region }}</div>
    </q-item-label>

    <q-item-label header>
      여행기간<br />
      {{ planstore.dates.from }} - {{ planstore.dates.to }}
    </q-item-label>
    <div>
      <q-btn
        class="float-right"
        dense
        flat
        round
        icon="add_circle_outline"
        @click="toggleRightDrawer"
        style="margin: 0; margin-right: 0.5rem"
      />
    </div>

    <q-tabs
      v-model="lefttab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      narrow-indicator
    >
      <q-tab name="places" label="일정 편집" />
      <!-- <q-tab name="rooms" label="숙소" /> -->
    </q-tabs>

    <q-separator />
    <q-scroll-area
      class="fit"
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 50vh"
    >
      <q-tab-panels v-model="lefttab">
        <q-tab-panel v-if="keystore.clickflag" name="places">
          <EditPlanHistory />
        </q-tab-panel>
        <q-tab-panel v-else name="places">
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
  >
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
    <form @submit.prevent="searchPlaces" class="q-ma-sm">
      <!-- TODO:  -->
      <q-input
        bottom-slots
        v-model="keyword"
        maxlength="10"
        dense
        @click="searchPlaces"
      >
        <template v-slot:before>
          <q-icon name="place" />
        </template>

        <template v-slot:append>
          <q-icon
            v-if="keyword !== ''"
            name="close"
            @click="keyword = ''"
            class="cursor-pointer"
          />
          <q-icon name="search" />
        </template>
      </q-input>
    </form>

    <q-scroll-area
      class="fit"
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 60vh"
    >
      <q-tab-panels v-model="lefttab">
        <q-tab-panel name="places">
          <q-list v-for="item in store.searchlist" :key="item.id">
            <q-item>
              <q-item-section>
                <q-item-label>{{ item.place_name }}</q-item-label>
                <q-item-label caption lines="3">{{
                  item.address_name
                }}</q-item-label>
                <q-item-label caption>{{ item.phone }}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <!-- <q-icon name="star" color="yellow" /> -->
                <q-btn
                  @click="addToAddList(item)"
                  round
                  color="primary"
                  icon="add"
                />
              </q-item-section>
            </q-item>

            <q-separator spaced inset />
          </q-list>
        </q-tab-panel>
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
