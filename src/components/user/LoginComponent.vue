<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "../../stores/member";
import { jwtDecode } from "jwt-decode";

const $q = useQuasar();

const name = ref(null);
const age = ref(null);
const accept = ref(true); //로그인 response
const password = ref("");
const isPwd = ref(true);

const router = useRouter();
const memberStore = useMemberStore();
const { isLogin } = storeToRefs(memberStore);
const { userLogin, userLogout } = memberStore;

const loginUser = ref({
  userId: "",
  userPassword: "",
});

const login = async () => {
  console.log(loginUser.value.userPassword);
  await userLogin(loginUser.value);
  let token = sessionStorage.getItem("accessToken");
  // if (isLogin) {
  //   getUserInfo(token);
  // }
  router.push("/");
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
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted",
    });
  }
};

const onReset = () => {
  loginUser.value.userId = null;
  loginUser.value.userPassword = null;
  accept.value = false;
};
</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-card class="my-card">
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="loginUser.userId"
            label="아이디"
            hint="이메일 형식으로 입력해 주세요"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || '아이디를 입력해 주세요',
            ]"
          />

          <q-input
            v-model="loginUser.userPassword"
            filled
            label="비밀번호"
            :type="isPwd ? 'password' : 'text'"
            hint="비밀번호 보기"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <div>
            <q-btn label="Submit" @click="login" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
            <q-btn label="Test" @click="logout" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
div {
  text-align: center;
  margin: 0 auto;
}
.q-btn {
  margin-top: 30px;
}
</style>
