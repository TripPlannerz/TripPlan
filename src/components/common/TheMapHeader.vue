<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { searchListStore } from "src/stores/example-store";
import { searchKeywordStore } from "src/stores/searchkeyword";

const store = searchListStore();
const keystore = searchKeywordStore();

const leftDrawerOpen = ref(false);
const keyword = ref("");
const miniState = ref(false);

const router = useRouter();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
  console.log("HERER");
};

const searchPlaces = () => {
  keystore.keywordlist(keyword.value);
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
    <!-- <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }"> -->
    <q-item-label header> 리스트 </q-item-label>
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
          <q-item-label caption lines="3">{{ item.address_name }}</q-item-label>
          <q-item-label caption>{{ item.phone }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <!-- <q-icon name="star" color="yellow" /> -->
          <q-btn round color="primary" icon="add" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />
    </q-list>
  </q-drawer>

  <q-drawer
    v-model="rightDrawerOpen"
    @click.capture="drawerClick"
    :width="300"
    :breakpoint="400"
    bordered
    side="right"
  >
    <!-- <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }"> -->
    <q-item-label header> asdfasdfasdfasdf </q-item-label>
    <q-list v-for="item in store.searchlist" :key="item.id">
      <q-item>
        <q-item-section>
          <q-item-label>{{ item.place_name }}</q-item-label>
          <q-item-label caption lines="3">{{ item.address_name }}</q-item-label>
          <q-item-label caption>{{ item.phone }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-icon name="star" color="yellow" />
          <!-- <q-btn round color="primary" icon="add" /> -->
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
