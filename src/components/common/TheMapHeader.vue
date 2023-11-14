<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { searchListStore } from "src/stores/example-store";
import { searchKeywordStore } from "src/stores/searchkeyword";
import { usePlanStore } from "src/stores/plan";

const store = searchListStore();
const keystore = searchKeywordStore();
const planstore = usePlanStore();

const leftDrawerOpen = ref(false);
const keyword = ref("");
const miniState = ref(false);
const addList = ref([]);

const router = useRouter();

const addToAddList = (i) => {
  keystore.saveaddlist([i.y, i.x]);
  addList.value.push(i);
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
  console.log("HERER");
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

onMounted(() => {
  console.log("SHSEHHSESEE");
});
</script>

<template>
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
      <q-item-label header> 여행지명 </q-item-label>
      <q-item-label header>
        여행기간<br />
        {{ planstore.dates.from }} - {{ planstore.dates.to }}
      </q-item-label>
      <div>
        <form @submit.prevent="searchPlaces">
          <input type="text" v-model="keyword" id="keyword" size="15" />
          <button type="submit">검색</button>
        </form>
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
    </q-scroll-area>
  </q-drawer>

  <q-drawer
    v-model="rightDrawerOpen"
    @click.capture="drawerClick"
    :width="300"
    :breakpoint="400"
    bordered
    side="right"
    show-if-above
  >
    <!-- <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }"> -->
    <q-item-label header> 추가된 리스트 </q-item-label>
    <q-list v-for="item in addList" :key="item.id">
      <q-item>
        <q-item-section>
          <q-item-label>{{ item.place_name }}</q-item-label>
          <q-item-label caption lines="3">{{ item.address_name }}</q-item-label>
          <q-item-label caption>{{ item.phone }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <!-- <q-icon name="star" color="yellow" /> -->
          <q-btn
            @click="removeFromAddList(item)"
            round
            color="primary"
            icon="home"
          />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />
    </q-list>
  </q-drawer>
</template>

<style lang="css" scoped>
.q-btn {
  margin: 10px;
}
</style>
