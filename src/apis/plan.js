import { localAxios } from "src/util/http-commons";
import { useSearchKeywordStore } from "src/stores/searchkeyword";
import { storeToRefs } from "pinia";

const local = localAxios();
const keystore = useSearchKeywordStore();

const { savedlist } = storeToRefs(keystore);

async function makePlan(param, success, fail) {
  await local
    .post(`/planApi/plan`, param)
    .then((res) => makeSchedule(res.data, savedlist.value))
    // .then((r) => makeSchedule(r, savedlist))
    .catch(fail);
}

async function makeSchedule(pid, param, success, fail) {
  console.log(pid, "pid     ", param, "param ");
  console.log("FINAL POST     ", { planId: pid, fullContent: param });
  await local
    .post(`/scheduleApi/schedule`, { planId: pid, fullContent: param })
    .then(success)
    .catch(fail);
}

// async function userConfirm(param, success, fail) {
//   await local.post(`/userApi/login`, param).then(success).catch(fail);
// }
// async function findById(userid, success, fail) {
//   local.defaults.headers["Authorization"] =
//     sessionStorage.getItem("accessToken");
//   await local.get(`/userApi/info/${userid}`).then(success).catch(fail);
// }

export { makePlan, makeSchedule };
