<script setup>
import { useQuasar } from "quasar";
import { ref, defineEmits } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "../../stores/member";
import { useMenuStore } from "../../stores/menu";

const emit = defineEmits(["onClose"]);

const $q = useQuasar();
const router = useRouter();

const accept = ref(true); //로그인 response
const isPwd = ref(true);

const memberStore = useMemberStore();
const menuStore = useMenuStore();

const { isLogin } = storeToRefs(memberStore);
const { userLogin, getUserInfo } = memberStore;
const { changeMenuState } = menuStore;

const loginUser = ref({
  userId: "",
  userPassword: "",
});

const login = async () => {
  console.log(loginUser.value.userPassword);

  await userLogin(loginUser.value);
  let token = sessionStorage.getItem("accessToken");
  console.log(isLogin.value);
  if (isLogin.value) {
    getUserInfo(token);

    $q.notify({
      color: "positive",
      textColor: "white",
      icon: "cloud_done",
      message: "로그인 성공",
    });
    changeMenuState();
    // router.push({ name: "main" });
    emit("onClose");
  } else {
    $q.notify({
      color: "negative",
      textColor: "white",
      icon: "warning",
      message: "로그인 실패",
    });

    onReset();
  }
};

const onReset = () => {
  loginUser.value.userId = null;
  loginUser.value.userPassword = null;
  accept.value = false;
};
</script>

<template>
  <div>
    <q-input
      filled
      v-model="loginUser.userId"
      label="아이디"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || '아이디를 입력해 주세요.']"
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
        @click="$emit('openRegister')"
      />
      <q-btn
        class="q-mx-sm q-my-md"
        label="로그인"
        type="submit"
        color="primary"
        @click="login"
      />
    </div>
  </div>
</template>

<style scoped></style>
