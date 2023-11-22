import { localAxios } from "src/util/http-commons";

const local = localAxios();

async function getPlanList() {
  return await local.get(`/planApi/plan`);
  // .then((r) => {
  //   console.log(r, "RR");
  //   return r;
  // })
  // .catch(()=>console.log("fail api"));
}

// async function userConfirm(param, success, fail) {
//   await local.post(`/userApi/login`, param).then(success).catch(fail);
// }
// async function findById(userid, success, fail) {
//   local.defaults.headers["Authorization"] =
//     sessionStorage.getItem("accessToken");
//   await local.get(`/userApi/info/${userid}`).then(success).catch(fail);
// }

export { getPlanList };
