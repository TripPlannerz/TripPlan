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
    router.push({ name: "main" });
  } else {
    console.log("ERROR WITH LOGOUT");
    router.push({ name: "error" });
  }
};

const isOpen = ref(false);
const openLogin = ref(false);
</script>

<template>
  <div class="container fixed-top q-mt-lg flex justify-between">
    <div class="row" style="width: 500px">
      <q-img
        src="public/images/process.png"
        spinner-color="primary"
        style="height: 50px; max-width: 50px; margin-left: 1rem"
      />

      <div class="q-pl-md q-gutter-sm" style="margin-top: 0.5rem">
        <router-link
          to="/"
          class="nav-item text-h6 text-weight-bold"
          spinner-color="white"
        >
          TripPlan
        </router-link>
      </div>
    </div>

    <div class="">
      <div class="q-pa-sm q-gutter-sm">
        <template v-for="menu in menuList" :key="menu.routeName">
          <template v-if="menu.show">
            <template v-if="menu.routeName === 'user-logout'">
              <router-link
                to="/"
                @click.prevent="logout"
                flat
                class="nav-item text-h6"
              >
                {{ menu.name }}
              </router-link>
            </template>
            <template v-else-if="menu.routeName === 'user-mypage'">
              <router-link
                :to="{ name: menu.routeName }"
                class="nav-item text-h6"
              >
                <q-avatar>
                  <q-img
                    src="public/images/user.png"
                    spinner-color="white"
                    style="height: 40px; max-width: 40px"
                /></q-avatar>
              </router-link>
            </template>
            <template v-else-if="menu.routeName === 'user-login'">
              <router-link
                @click="(openLogin = true), (isOpen = true)"
                class="nav-item text-h6"
                to=""
              >
                {{ menu.name }}
              </router-link>
            </template>
            <template v-else-if="menu.routeName === 'user-register'">
              <router-link
                @click="(openLogin = false), (isOpen = true)"
                class="nav-item text-h6"
                to=""
              >
                {{ menu.name }}
              </router-link>
            </template>
          </template>
        </template>
      </div>
    </div>

    <q-dialog v-model="isOpen" class="z-top">
      <q-card class="fixed-center" style="min-width: 600px">
        <q-card-section class="col items-center">
          <q-card-section class="row items-center justify-center">
            <q-avatar
              icon="perm_contact_calendar"
              color="primary"
              text-color="white"
            />
            <div class="fixed-top-right q-ma-sm">
              <q-btn icon="close" flat round dense v-close-popup />
            </div>
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
            @openLogin="openLogin = true"
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

.q-card {
  border-radius: 0.5rem;
}

.nav-item {
  cursor: pointer;
  margin-top: 2rem;
  margin-right: 1rem;
  color: #0c356a;
  text-decoration: none;
}
</style>
