<template>
  <div>
    <div id="map"></div>
    <button @click="displayMarker(markerPositions1)">marker set 1</button>
    <button @click="getCarDirection(markerPositions1)">marker set 1</button>
  </div>
</template>

<script setup>
import { toRaw, ref, onMounted, watch, watchEffect } from "vue";
import { searchListStore } from "src/stores/example-store";
import { searchKeywordStore } from "src/stores/searchkeyword";
import { usePlanStore } from "src/stores/plan";

const infowindow = ref(null);
const store = searchListStore();
const keystore = searchKeywordStore();
const destinationstore = usePlanStore();

const routetest = ref([]);

const markerPositions1 = ref([
  [33.452278, 126.567803],
  [33.452671, 126.574792],
]);

const x = ref("");
const y = ref("");

let map;
let ps;
let geocoder;
let polyline;
let markers = ref([]);

const keyword = ref("이태원");

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
    // settingInitialPos();
  } else {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(initMap);

    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6db43cbd5aa9d740e67c59d2869dcd49&libraries=services";
    document.head.appendChild(script);
  }
});

const initializeMap = () => {
  const container = document.getElementById("map");
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
  const container = document.getElementById("map");
  // let x, y;

  geocoder = new kakao.maps.services.Geocoder();

  if (geocoder && geocoder.addressSearch) {
    geocoder.addressSearch(
      destinationstore.places.region,
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

const changeSize = (size) => {
  const container = document.getElementById("map");
  container.style.width = `${size}px`;
  container.style.height = `${size}px`;
  toRaw(map).relayout();
};

const poly = (markerPositions) => {
  console.log(markerPositions.value[0][0], "mp");
  const positions = markerPositions.value.map(
    (position) => new kakao.maps.LatLng(position[0], position[1])
  );

  polyline = new kakao.maps.Polyline({
    path: positions, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 5, // 선의 두께 입니다
    strokeColor: "#FFAE00", // 선의 색깔입니다
    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: "solid", // 선의 스타일입니다
  });
  polyline.setMap(map);
};

const displayMarker = (markerPositions) => {
  //   console.log(markerPositions, "MARKER");
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }

  //const p = markerPositions.map((x) => console.log(x, x[0], x[1], "HELLO"));

  const positions = markerPositions.map(
    (position) => new kakao.maps.LatLng(position[0], position[1])
  );

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
  poly(markerPositions1);
};

async function getCarDirection(pos) {
  const REST_API_KEY = "371a52c82d3c75a0d5afd8dc71a2c554";
  // 호출방식의 URL을 입력합니다.
  const url = "https://apis-navi.kakaomobility.com/v1/directions";

  // 출발지(origin), 목적지(destination)의 좌표를 문자열로 변환합니다.
  // const origin = `${pointObj.startPoint.lng},${pointObj.startPoint.lat}`;
  // const destination = `${pointObj.endPoint.lng},${pointObj.endPoint.lat}`;
  console.log(pos);
  const origin = `${pos[0][1]},${pos[0][0]}`;
  const destination = `${pos[1][1]},${pos[1][0]}`;
  //   const origin = tmporigin.toString();
  //   const destination = tmpdestination.toString();
  console.log(pos[0]);
  //   const origin = "127.111202,37.394912";
  //   const destination = "127.111202,37.404912";
  console.log(origin, "origin");

  // 요청 헤더를 추가합니다.
  const headers = {
    Authorization: `KakaoAK ${REST_API_KEY}`,
    "Content-Type": "application/json",
  };

  // 표3의 요청 파라미터에 필수값을 적어줍니다.
  const queryParams = new URLSearchParams({
    origin: origin,
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

    const data = await response.json();

    data.routes[0].sections[0].roads.forEach((router) => {
      router.vertexes.forEach((vertex, index) => {
        if (index % 2 === 0) {
          routetest.value.push([
            router.vertexes[index + 1],
            router.vertexes[index],
          ]);
        }
      });
    });

    console.log(data);
    console.log(routetest, "route TEST");
    poly(routetest);
  } catch (error) {
    console.error("Error:", error);
  }
}

// watchEffect(() => {
//   // keyword.value = keystore.saveaddlist;
//   // console.log(keyword.value);

//   // if (ps && ps.keywordSearch) {
//   //   ps.keywordSearch(keyword.value, placesSearchCB);
//   // } else {
//   //   console.error("ps 객체 또는 keywordSearch 메소드가 정의되지 않았습니다.");
//   // }

//   displayMarker(keystore.addlist);

//   // 추가로 필요한 로직 수행
// });

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
#map {
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
