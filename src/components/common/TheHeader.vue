<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSearchListStore } from "src/stores/example-store";

const store = useSearchListStore();

const leftDrawerOpen = ref(false);
const leftMiniOpen = ref(false);
const miniState = ref(false);

const router = useRouter();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
  console.log("HERER");
};

const loginFunction = () => {
  router.push({ name: "user-login" });
};
const registerFunction = () => {
  router.push({ name: "user-register" });
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
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <q-toolbar-title> 여행갑시다 타이틀 미정 </q-toolbar-title>

      <div>
        <q-btn
          outline
          style="color: goldenrod"
          label="로그인"
          @click="loginFunction"
        />
        <q-btn color="brown-5" label="회원가입" @click="registerFunction" />
      </div>
    </q-toolbar>
  </q-header>

  <q-drawer
    v-model="leftDrawerOpen"
    @click.capture="drawerClick"
    :width="300"
    :breakpoint="400"
    bordered
    side="left"
  >
    <!-- <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }"> -->
    <q-item-label header> 리스트 </q-item-label>
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
