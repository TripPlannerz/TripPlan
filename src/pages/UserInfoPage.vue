<script setup>
import TheHeadingNavbar from "src/components/common/TheHeadingNavbar.vue";
import UserFormComponent from "../components/user/UserFormComponent.vue";
import ContentsCards from "src/components/main/ContentsCards.vue";

import { storeToRefs } from "pinia";
import { useMemberStore } from "../stores/member";
import { ref, onMounted } from "vue";
import router from "src/router";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const modify = ref(false);

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

onMounted(() => {
  if (!userInfo.value) {
    router.push({ name: "main" });
  }
});
</script>

<template>
  <TheHeadingNavbar />
  <div class="container">
    <q-card
      class="fixed-center fullscreen q-mt-lg"
      style="width: 80%; height: 70vh"
    >
      <q-card-section>
        <div class="card-header q-mt-md q-mb-xl">
          <div class="text-h4">안녕하세요, {{ userInfo?.userName }}님</div>
          <div>
            <q-btn @click="modify = !modify">회원 정보 수정</q-btn>
          </div>
        </div>

        <UserFormComponent :type="'myPage'" v-if="modify" />
        <div v-else>
          <div style="height: 100%">
            <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle">
              <ContentsCards />
            </q-scroll-area>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  text-align: center;
}

.q-scrollarea {
  height: 50vh;
  border-radius: 0.5rem;
}
.example-item {
  height: 290px;
  width: 290px;
}

.card-header {
  display: flex;
  justify-content: space-between;
}
</style>
