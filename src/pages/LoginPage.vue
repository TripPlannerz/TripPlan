<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();

const id = ref(null);
const password = ref("");

const accept = ref(true); //로그인 response
const isPwd = ref(true);

const onSubmit = () => {
  if (accept.value !== true) {
    $q.notify({
      color: "negative",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    $q.notify({
      color: "positive",
      textColor: "white",
      icon: "cloud_done",
      message: "로그인 성공",
    });

    router.replace("/");
  }
};
</script>

<template>
  <div class="container">
    <q-card class="fixed-center my-card" style="min-width: 400px">
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-sm">
          <q-input
            filled
            v-model="id"
            label="아이디"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || '아이디를 입력해 주세요.',
            ]"
          />

          <q-input
            v-model="password"
            filled
            label="비밀번호"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="float-left">
            <q-toggle v-model="accept" label="아이디 저장" />
          </div>
          <div class="float-right">
            <q-btn
              class="q-mx-sm q-my-md"
              label="회원가입"
              type="button"
              color="primary"
              flat
              @click="router.push('/signin')"
            />
            <q-btn
              class="q-mx-sm q-my-md"
              label="로그인"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  text-align: center;
}
</style>
