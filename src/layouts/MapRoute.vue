<template>
  <div>
    <div id="map2"></div>
    <button @click="displayMarker(keystore.getSavedList)">marker set 1</button>
    <button @click="routeClick()">marker set 1</button>
    <button @click="routeDel()">marker set 1</button>
    <!-- <button @click="">marker set 1</button> -->
  </div>
</template>

<script setup>
import { toRaw, ref, onMounted, watch, watchEffect } from "vue";
import { useSearchListStore } from "src/stores/example-store";
import { useSearchKeywordStore } from "src/stores/searchkeyword";
import { usePlanStore } from "src/stores/plan";

const infowindow = ref(null);
const store = useSearchListStore();
const keystore = useSearchKeywordStore();
const destinationstore = usePlanStore();
const customlist = ref([]);

const routetest = ref([]);
const routeall = ref([]);
//const keyword = ref();

const routecolor = ["#CC0000", "#6666CC", "#99FF00"];

const markerPositions1 = ref(keystore.savedlist);
//const test = ref(keystore.getSavedList());

const x = ref("");
const y = ref("");

let map;
let geocoder;
let polyline;
let ps;
let polyarr = [];
let markers = ref([]);

const keyword = ref("이태원");
const routeDel = () => {
  // if (routeall.value) {
  //   await polyDelete(routeall.value);
  //   console.log("지워!");
  //   routeall.value = [];
  // }
  polyDelete();
  console.log("지워!");
  polyline = [];
  routeall.value = [];
};
onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
    console.log("너 안만들었지????????????? ?");
    // settingInitialPos();
  } else {
    console.log("OQOQOWQOQWOPEPOQWPOEOPJQWOJRGIUQHWA");
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(initMap);

    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6db43cbd5aa9d740e67c59d2869dcd49&libraries=services";
    document.head.appendChild(script);
  }
});

// const routeClick = async () => {
//   //console.log(keystore.savedlist.length, "LENGTH");
//   for (let i = 0; i < keystore.savedlist.length - 1; i++) {
//     console.log(`Before getCarDirection ${i}`);
//     await getCarDirection(markerPositions1, i);
//     console.log(`After getCarDirection ${i}`);
//   }
// };

const routeClick = async () => {
  console.log(keystore.savedlist.length - 1, "LENGTH!@#$");

  // if (routeall.value) {
  //   await polyDelete(routeall.value);
  //   console.log("지워!");
  //   routeall.value = [];
  // }
  for (let i = 0; i < keystore.savedlist.length; i++) {
    routetest.value = [];
    console.log(`Before getCarDirection ${i}`);
    console.log("keystore.getSavedList()", keystore.getSavedList);
    await getCarDirection(keystore.getSavedList, i);
    await poly(routetest.value, i);
    routeall.value.push(routetest.value);
    console.log(`After getCarDirection ${i}`);
  }

  console.log(routeall.value, "routeall");
};

const initializeMap = () => {
  const container = document.getElementById("map2");
  const options = {
    center: new kakao.maps.LatLng(y.value, x.value),
    level: 5,
  };

  map = new kakao.maps.Map(container, options);
  ps = new kakao.maps.services.Places();
};

//   watchEffect(() => {
//     console.log("myData 값이 변경되었습니다. 새로운 값:", keystore.keywordlist);
//     keyword.value = keystore.keywordlist;
//     console.log(keyword.value);

//     if (ps && ps.keywordSearch) {
//       ps.keywordSearch(keyword.value, placesSearchCB);
//     } else {
//       console.error("ps 객체 또는 keywordSearch 메소드가 정의되지 않았습니다.");
//     }

//     // 추가로 필요한 로직 수행
//   });

//   const placesSearchCB = (data, status, pagination) => {
//     //ㄴ나중에 status 처리 해야함
//     console.log(data);
//     store.savelist(data);

//     // displayMarker(data);
//   };

const initMap = () => {
  const container = document.getElementById("map2");
  // let x, y;

  geocoder = new kakao.maps.services.Geocoder();

  if (geocoder && geocoder.addressSearch) {
    geocoder.addressSearch(
      destinationstore.places.region,
      // destinationstore.places.region,
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          console.log("HERERE", status, result);
          // coords =
          //options.center = new kakao.maps.LatLng(result[0].y, result[0].x);
          y.value = result[0].y;
          x.value = result[0].x;
          initializeMap();
        }
      }
    );
  } else {
    console.error("geocoder 객체 또는 addressSearch 메소드정의 X.");
  }

  // console.log(y.value, x.value, "xyxyxy");
  // const options = {
  //   center: new kakao.maps.LatLng(y.value, x.value), //여기에서 앞페이지에 넘어온 지역의 위도 경도값 넣어줘야함.
  //   //center: "",
  //   level: 5,
  // };
  // console.log(options);
  // //지도 객체를 등록합니다.
  // //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  // map = new kakao.maps.Map(container, options);
  // ps = new kakao.maps.services.Places();
  // //ps = new kakao.maps.services.Places();
  // //   console.log(map, "THIS");
};

const poly = (markerPositions, dayidx) => {
  // console.log(markerPositions.value[0][0], "mp");
  const positions = markerPositions.map(
    // (position) => new kakao.maps.LatLng(position[0], position[1])
    (pos) => new kakao.maps.LatLng(pos.data[0], pos.data[1])
  );

  // let daycolorval = markerPositions[dayidx].day;
  console.log("ROUTE COLORE", routecolor[dayidx], dayidx);
  polyline = new kakao.maps.Polyline({
    path: positions, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 5, // 선의 두께
    strokeColor: routecolor[dayidx], //routecolor[dayidx],
    strokeOpacity: 0.7, // 선의 불투명도
    strokeStyle: "solid", //  스타일
  });
  polyarr.push(polyline);
  polyline.setMap(map);
};

const polyDelete = () => {
  // markerPositions = markerPositions.flat();
  polyarr.map((p) => p.setMap(null));
  //polyline.setMap(null);
};

const displayMarker = (markerPositions) => {
  //   console.log(markerPositions, "MARKER");
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }

  markerPositions = markerPositions.flat();

  const p = markerPositions.map((x) => console.log(x, x.x, x.y, "DATA@@@@"));

  const positions = markerPositions.map(
    (position) => new kakao.maps.LatLng(position.y, position.x)
  );
  console.log(positions, "POPOSPOPSOPSOPSOPOS");

  // const positions = markerPositions.map(
  //   (position) => new kakao.maps.LatLng(position.y, position.x)
  // );
  //console.log(positions, "POS");

  if (positions.length > 0) {
    markers.value = positions.map(
      (position) =>
        new kakao.maps.Marker({
          map: toRaw(map),
          position,
        })
    );

    const bounds = positions.reduce(
      (bounds, latlng) => bounds.extend(latlng),
      new kakao.maps.LatLngBounds()
    );

    toRaw(map).setBounds(bounds);
  }
  // poly(markerPositions1);
};

async function getCarDirection(pos, day) {
  const REST_API_KEY = "49ee752b6adad5d571e167a5b530ab1f";
  // 호출방식의 URL을 입력합니다.
  const url = "https://apis-navi.kakaomobility.com/v1/directions";

  // 출발지(origin), 목적지(destination)의 좌표를 문자열로 변환합니다.
  // const origin = `${pointObj.startPoint.lng},${pointObj.startPoint.lat}`;
  // const destination = `${pointObj.endPoint.lng},${pointObj.endPoint.lat}`;
  console.log(pos, "NAVI");
  console.log(pos[day], "posday");
  let lastidx = pos[day].length - 1;
  console.log(lastidx, "lastidx");
  const origin = `${pos[day][0].x},${pos[day][0].y}`;
  const destination = `${pos[day][lastidx].x},${pos[day][lastidx].y}`;
  const waypoints = ``; //여러개면 |로 이어서 할 것
  //   const origin = tmporigin.toString();
  //   const destination = tmpdestination.toString();
  console.log(lastidx, "lidx");
  console.log(pos[day], "day");

  const temp = pos[day].map((data) => [data.x, data.y]);

  // Filter out elements with undefined values for x or y
  const filteredTemp = temp.filter(
    (data) => data[0] !== undefined && data[1] !== undefined
  );

  const formattedString = filteredTemp
    .slice(1, -1)
    .map((data) => `${data[0]},${data[1]}`)
    .join("|");

  // console.log(
  //   pos.value[day][0].place_name,
  //   pos.value[day][0].y,
  //   pos.value[day][0].x,
  //   "day1 start"
  // );
  // console.log(
  //   pos.value[day][lastidx].place_name,
  //   pos.value[day][lastidx].y,
  //   pos.value[day][lastidx].x,
  //   "day 1 final"
  // );
  //   const origin = "127.111202,37.394912";
  //   const destination = "127.111202,37.404912";

  // 요청 헤더를 추가합니다.
  const headers = {
    Authorization: `KakaoAK ${REST_API_KEY}`,
    "Content-Type": "application/json",
  };

  // 표3의 요청 파라미터에 필수값을 적어줍니다.
  const queryParams = new URLSearchParams({
    origin: origin,
    waypoints: formattedString,
    destination: destination,
  });

  const requestUrl = `${url}?${queryParams}`; // 파라미터까지 포함된 전체 URL

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const newRoutes = [];
    const data = await response.json();
    console.log(data, "================");

    destinationstore.tripinfo.push({
      taxifare: data.routes[0].summary.fare.taxi,
      duration: data.routes[0].summary.duration,
      distance: data.routes[0].summary.distance,
    });

    console.log(
      data.routes[0].summary.fare.taxi,
      data.routes[0].summary.duration,
      data.routes[0].summary.distance,
      "D====================DDDATATATA"
    );
    // taxifare.push(data.route[0].summary.fare.taxi);
    // duration.push(data.route[0].summary.duration);
    // distance.push(data.route[0].summary.distance);
    let sectionlen = data.routes[0].sections.length;
    for (let i = 0; i < sectionlen; i++) {
      data.routes[0].sections[i].roads.forEach((router) => {
        router.vertexes.forEach((vertex, index) => {
          if (index % 2 === 0) {
            newRoutes.push({
              day: day,
              data: [router.vertexes[index + 1], router.vertexes[index]],
            });
          }
        });
      });
    }
    routetest.value = [...routetest.value, ...newRoutes];

    console.log(routetest.value, "route TEST");
    // poly(routetest);
  } catch (error) {
    console.error("Error:", error);
  }
  console.log(`Exiting getCarDirection ${day}`);
}

watchEffect(() => {
  customlist.value = keystore.savedlist;
  // console.log(customlist.value);
  // if (ps && ps.keywordSearch) {
  //   ps.keywordSearch(customlist.value, placesSearchCB);
  // } else {
  //   console.error("ps 객체 또는 keywordSearch 메소드가 정의되지 않았습니다.");
  // }
  destinationstore.clearTripInfo;
  displayMarker(keystore.savedlist);
  routeClick();
  routeDel();
  // 추가로 필요한 로직 수행
});

/////////////////지우면 안됨//////////////////////////

// const displayInfoWindow = () => {
//   if (this.infowindow && this.infowindow.getMap()) {
//     //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
//     toRaw(this.map).setCenter(this.infowindow.getPosition());
//     return;
//   }

//   var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
//     iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
//     iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

//   this.infowindow = new kakao.maps.InfoWindow({
//     map: toRaw(this.map), // 인포윈도우가 표시될 지도
//     position: iwPosition,
//     content: iwContent,
//     removable: iwRemoveable,
//   });

//   toRaw(this.map).setCenter(iwPosition);
// };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map2 {
  width: 100%;
  height: 800px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
