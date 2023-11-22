import { localAxios } from "src/util/http-commons";

const local = localAxios();

async function userConfirm(param, success, fail) {
  await local.post(`/userApi/login`, param).then(success).catch(fail);
}
async function findById(userid, success, fail) {
  local.defaults.headers["Authorization"] =
    sessionStorage.getItem("accessToken");
  await local.get(`/userApi/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  local.defaults.headers["refreshToken"] =
    sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await local.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await local.get(`/userApi/logout/${userid}`).then(success).catch(fail);
}

async function register(user, success, fail) {
  await local.post(`/userApi/register`, user).then(success).catch(fail);
}

async function modify(user, success, fail) {
  await local.patch(`/userApi/user`, user).then(success).catch(fail);
}

export { userConfirm, findById, tokenRegeneration, logout, register, modify };
