<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "../../stores/member";
import { jwtDecode } from "jwt-decode";

const $q = useQuasar();
const router = useRouter();

const id = ref(null);
const password = ref("");

const accept = ref(true); //로그인 response
const isPwd = ref(true);

const router = useRouter();
const memberStore = useMemberStore();
const { isLogin } = storeToRefs(memberStore);
const { userLogin, userLogout, getUserInfo } = memberStore;

const loginUser = ref({
  userId: "",
  userPassword: "",
});

const login = async () => {
  console.log(loginUser.value.userPassword);
  await userLogin(loginUser.value);
  let token = sessionStorage.getItem("accessToken");
  if (isLogin) {
    getUserInfo(token);
  }
  router.push("/plan");
};

const logout = async () => {
  // console.log(loginUser.value.userPassword);
  console.log(isLogin.value, "THIS IS LKGOINGIN COMPO");
  if (isLogin) {
    let token = sessionStorage.getItem("accessToken");
    let decodeToken = jwtDecode(token);
    await userLogout(decodeToken.userId);

    router.push("/");
  } else {
    console.log("ERROR WITH LOGOUT");
    router.push("/error");
  }
};

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
const onReset = () => {
  loginUser.value.userId = null;
  loginUser.value.userPassword = null;
  accept.value = false;
};
</script>

<template>
  <div class="container">
    <q-card class="fixed-center my-card" style="min-width: 400px">
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-sm">
          <q-input
            filled
            v-model="loginUser.userId"
            label="아이디"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || '아이디를 입력해 주세요.',
            ]"
          />

          <q-input
            v-model="loginUser.userPassword"
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
            <q-btn label="Test" @click="logout" color="primary" />
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
