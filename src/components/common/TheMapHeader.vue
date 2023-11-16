<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { searchListStore } from "src/stores/example-store";
import { searchKeywordStore } from "src/stores/searchkeyword";
import { usePlanStore } from "src/stores/plan";

const store = searchListStore();
const keystore = searchKeywordStore();
const planstore = usePlanStore();

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);
const keyword = ref("");
const miniState = ref(false);
const addList = ref([]);
const currentRoomCnt = ref(0);
const tab = ref("places");
const filterList = ref(["맛집", "카페", "관광지"]);
const roomfilterList = ref(["호텔", "리조트", "모텔"]);

const router = useRouter();

const filterSearch = (f) => {
  console.log(planstore.places.region);
  keystore.savewordlist(planstore.places.region + f); //지역명 + 필터 키워드 검색
};

const addToAddList = (i) => {
  if (i.category_group_code === "AD5" && keystore.getRooms === planstore.days) {
    console.log("여행일 이상은 추가할 수 없습니다.");
  } else {
    keystore.saveaddlist(i);
    i.savetype = tab.value;
    addList.value.push(i);
  }
};

const removeFromAddList = (i) => {
  const index = addList.value.indexOf(i);
  if (index !== -1) {
    addList.value.splice(index, 1);
    keystore.removeaddlist(index);
  }
};

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

watchEffect(() => {
  let tmpcnt = 0;
  keystore.addlist.map((f) => {
    if (f[2] === "rooms") {
      tmpcnt++;
    }
    console.log(tmpcnt, "qwerty");
  });
  currentRoomCnt.value = tmpcnt;
});

onMounted(() => {
  console.log("SHSEHHSESEE");
});
</script>

<template>
  <q-header class="bg-primary text-white">
    <q-toolbar>
      <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        Title
      </q-toolbar-title>

      <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
      <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
    </q-toolbar>
  </q-header>

  <q-drawer
    v-model="leftDrawerOpen"
    @click.capture="drawerClick"
    :width="300"
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
        <form @submit.prevent="searchPlaces">
          <input type="text" v-model="keyword" id="keyword" size="15" />
          <button type="submit">검색</button>
        </form>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </div>

      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
      >
        <q-tab name="places" label="장소" />
        <q-tab name="rooms" label="숙소" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab">
        <q-tab-panel name="places">
          <div>
            <q-btn
              v-for="f in filterList"
              :key="`btn_${f}`"
              color="primary"
              :size="'md'"
              :label="`${f}`"
              outline
              rounded
              @click="filterSearch(f)"
            />
          </div>
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

        <q-tab-panel name="rooms">
          <div class="text-h6">Rooms</div>
          <div>
            <q-btn
              v-for="f in roomfilterList"
              :key="`btn_${f}`"
              color="primary"
              :size="'md'"
              :label="`${f}`"
              outline
              rounded
              @click="filterSearch(f)"
            />
          </div>
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

  <q-drawer
    v-model="rightDrawerOpen"
    bordered
    side="right"
    :push="true"
    show-if-above
  >
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
      <q-item-label header> 추가된 리스트 </q-item-label>

      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
      >
        <q-tab name="places" label="장소" />
        <q-tab name="rooms" label="숙소" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab">
        <q-tab-panel name="places">
          <q-list v-for="item in keystore.addlist" :key="item.id">
            <q-item v-if="item.category_group_code !== 'AD5'">
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
                  @click="removeFromAddList(item)"
                  round
                  color="primary"
                  icon="delete"
                />
              </q-item-section>
            </q-item>

            <q-separator
              v-if="item.category_group_code !== 'AD5'"
              spaced
              inset
            />
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="rooms">
          <!-- <div class="text-h6">Rooms</div> -->
          <p>{{ keystore.getRooms }} / {{ planstore.days }}</p>
          <q-list v-for="item in keystore.addlist" :key="item.id">
            <q-item v-if="item.category_group_code === 'AD5'">
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
                  @click="removeFromAddList(item)"
                  round
                  color="primary"
                  icon="delete"
                />
              </q-item-section>
            </q-item>

            <q-separator
              v-if="item.category_group_code === 'AD5'"
              spaced
              inset
            />
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
