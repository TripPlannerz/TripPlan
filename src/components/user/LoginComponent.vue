<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";

const $q = useQuasar();

const name = ref(null);
const age = ref(null);
const accept = ref(true); //로그인 response
const password = ref("");
const isPwd = ref(true);

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
  name.value = null;
  age.value = null;
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
            v-model="name"
            label="아이디"
            hint="이메일 형식으로 입력해 주세요"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || '아이디를 입력해 주세요',
            ]"
          />

          <q-input
            v-model="password"
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
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
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
