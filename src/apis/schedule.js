import { localAxios } from "src/util/http-commons";

const local = localAxios();

async function getPlanList() {
  return await local.get(`/planApi/plan`);
  ////////////////지우지마///////
  // .then((r) => {
  //   console.log(r, "RR");
  //   return r;
  // })
  // .catch(()=>console.log("fail api"));
}
async function getMyPlanList(uid) {
  return await local.get(`/planApi/plan/mypage/${uid}`);
}

async function getPlanDetail(pid) {
  return await local.get(`/planApi/plan/${pid}`);
}

async function getSchedule(pid) {
  return await local.get(`/scheduleApi/schedule/${pid}`);
  // .then((r) => console.log(r, "getSche"))
  // .catch((e) => console.log(e));
}

export { getPlanList, getMyPlanList, getPlanDetail, getSchedule };
