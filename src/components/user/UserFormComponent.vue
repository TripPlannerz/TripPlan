<script setup>
import { useQuasar } from "quasar";
import { onMounted, ref, defineEmits } from "vue";
import { patterns } from "quasar";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMemberStore } from "../../stores/member";
import { register, modify } from "../../apis/user";

const { testPattern } = patterns;

const emit = defineEmits(["onClose"]);

const router = useRouter();
const $q = useQuasar();
const memberStore = useMemberStore();

const props = defineProps({ type: String });
const { userInfo } = storeToRefs(memberStore);
const { getUserInfo } = memberStore;

const id = ref(null);
const name = ref(null);
const email = ref(null);
const password = ref("");
const passwordCheck = ref("");
const editable = ref(false);

onMounted(() => {
  console.log(props.type);
  if (props.type === "myPage") {
    let token = sessionStorage.getItem("accessToken");
    getUserInfo(token);
    editable.value = true;
    // console.log("userinfo ", userInfo);
    // console.log(userInfo.value);
    id.value = userInfo.value.userId;
    name.value = userInfo.value.userName;
    email.value = userInfo.value.emailId + "@" + userInfo.value.emailDomain;
  }
});

const onSubmit = () => {
  if (props.type === "register") {
    userInfo.value = {
      userId: id.value,
      userName: name.value,
      userPassword: password.value,
      emailId: email.value.split("@")[0],
      emailDomain: email.value.split("@")[1],
    };
    console.log(userInfo.value);
    register(
      userInfo.value,
      (response) => {
        let msg = "회원가입 오류";
        if (response.status == 201) msg = "회원가입이 완료되었습니다.";
        console.log(msg);
        router.push({ name: "main" });
        emit("onClose");
      },
      (error) => console.log(error)
    );
  } else if (props.type === "myPage") {
    // update userinfo
    userInfo.value = {
      userId: id.value,
      userName: name.value,
      userPassword: password.value,
      emailId: email.value.split("@")[0],
      emailDomain: email.value.split("@")[1],
    };

    console.log(userInfo.value);
    modify(
      userInfo.value,
      (response) => {
        let msg = "회원 정보 수정 오류";
        if (response.status == 200) msg = "회원 정보 수정이 완료되었습니다.";
        console.log(msg);
        router.push({ name: "user-mypage" });
      },
      (error) => console.log(error)
    );
  }

  $q.notify({
    color: "positive",
    textColor: "white",
    icon: "cloud_done",
    message: props.type === "register" ? "회원가입 성공" : "정보 수정 완료",
  });
};
const onReset = () => {
  name.value = null;
  age.value = null;
  accept.value = false;
};
</script>

<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input
      filled
      v-model="id"
      label="아이디"
      :readonly="editable"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || '아이디를 입력하세요.']"
    />
    <q-input
      filled
      v-model="name"
      label="이름"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || '이름을 입력하세요.']"
    />
    <q-input
      filled
      v-model="email"
      label="이메일"
      type="email"
      lazy-rules
      :rules="[
        (val) => !!val || '이메일을 입력하세요',
        (val) => testPattern.email(val) || '이메일 형식이 올바르지 않습니다.',
      ]"
    />
    <q-input
      filled
      v-model="password"
      label="비밀번호"
      type="password"
      lazy-rules=""
      :rules="[
        (val) =>
          (val && val.length >= 6) || '비밀번호는 6자 이상이어야 합니다.',
      ]"
    />
    <q-input
      filled
      v-model="passwordCheck"
      label="비밀번호 확인"
      type="password"
      lazy-rules
      :rules="[(val) => password === val || '비밀번호가 일치하지 않습니다.']"
    />

    <div class="float-right">
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      <q-btn
        class="q-mx-sm q-my-md"
        :label="type === 'register' ? '가입' : '수정'"
        type="submit"
        color="primary"
      />
    </div>
  </q-form>
</template>

<style scoped>
.container {
  height: 100vh;
  text-align: center;
}
</style>
