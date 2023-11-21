<script setup>
import { useQuasar } from "quasar";
import { onMounted, ref } from "vue";
import { patterns } from "quasar";
import { useRouter } from "vue-router";
const { testPattern } = patterns;

const router = useRouter();
const props = defineProps({ type: String });

const $q = useQuasar();

const id = ref(null);
const name = ref(null);
const email = ref(null);
const password = ref("");
const passwordCheck = ref("");

onMounted(() => {
  console.log(props.type);
});

const onSubmit = () => {
  $q.notify({
    color: "positive",
    textColor: "white",
    icon: "cloud_done",
    message: "회원가입 성공",
  });

  router.push("/");
};
const onReset = () => {
  name.value = null;
  age.value = null;
  accept.value = false;
};
</script>

<template>
  <div class="container">
    <q-card class="fixed-center my-card" style="min-width: 400px">
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="id"
            label="아이디"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || '아이디를 입력하세요.',
            ]"
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
              (val) =>
                testPattern.email(val) || '이메일 형식이 올바르지 않습니다.',
            ]"
          />
          <q-input
            filled
            v-model="password"
            label="비밀번호"
            type="password"
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
            :rules="[
              (val) => password === val || '비밀번호가 일치하지 않습니다.',
            ]"
          />

          <div class="float-right">
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
            <q-btn
              class="q-mx-sm q-my-md"
              :label="type === 'signin' ? '가입' : '수정'"
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
