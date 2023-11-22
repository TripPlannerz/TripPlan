<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMenuStore } from "../../stores/menu";
import { useMemberStore } from "../../stores/member";
import { storeToRefs } from "pinia";
import { jwtDecode } from "jwt-decode";
import LoginComponent from "../user/LoginComponent.vue";
import UserFormComponent from "../user/UserFormComponent.vue";

const router = useRouter();

const menuStore = useMenuStore();
const memberStore = useMemberStore();

const { menuList } = storeToRefs(menuStore);
const { changeMenuState } = menuStore;

const { isLogin } = storeToRefs(memberStore);
const { userLogout } = memberStore;

const logout = async () => {
  console.log(isLogin.value, "THIS IS LKGOINGIN COMPO");
  if (isLogin.value) {
    let token = sessionStorage.getItem("accessToken");
    let decodeToken = jwtDecode(token);
    await userLogout(decodeToken.userId);

    changeMenuState();
    router.push("/");
  } else {
    console.log("ERROR WITH LOGOUT");
    router.push({ name: "error" });
  }
};

const isOpen = ref(false);
const openLogin = ref(false);
</script>

<template>
  <div class="container fixed-top relative-position">
    <div class="fixed-top-left q-pa-md q-gutter-sm">
      <q-btn to="/" flat class="text-h5"> Trip </q-btn>
    </div>

    <div class="fixed-top-right">
      <div class="q-pa-sm q-gutter-sm">
        <template v-for="menu in menuList" :key="menu.routeName">
          <template v-if="menu.show">
            <template v-if="menu.routeName === 'user-logout'">
              <q-btn to="/" @click.prevent="logout" flat class="text-h5">
                {{ menu.name }}
              </q-btn>
            </template>
            <template v-else-if="menu.routeName === 'user-mypage'">
              <q-btn :to="{ name: menu.routeName }" flat class="text-h5">
                <q-avatar icon="account_circle" text-color="black" />
              </q-btn>
            </template>
            <template v-else-if="menu.routeName === 'user-login'">
              <q-btn
                @click="(openLogin = true), (isOpen = true)"
                flat
                class="text-h5"
              >
                {{ menu.name }}
              </q-btn>
            </template>
            <template v-else-if="menu.routeName === 'user-register'">
              <q-btn
                @click="(openLogin = false), (isOpen = true)"
                flat
                class="text-h5"
              >
                {{ menu.name }}
              </q-btn>
            </template>
          </template>
        </template>
      </div>
    </div>

    <q-dialog v-model="isOpen" class="z-top">
      <q-card class="fixed-center" style="min-width: 600px">
        <q-card-section class="col items-center">
          <q-card-section class="row items-center">
            <q-avatar
              icon="perm_contact_calendar"
              color="primary"
              text-color="white"
            />
          </q-card-section>
          <LoginComponent
            v-if="openLogin === true"
            @onClose="isOpen = false"
            @openRegister="openLogin = false"
          />
          <UserFormComponent
            v-else
            :type="'register'"
            @onClose="isOpen = false"
          />
        </q-card-section>

        <!-- <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
        </q-card-actions> -->
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
.container {
  z-index: 5000;
}
</style>
