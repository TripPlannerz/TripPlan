<template>
  <div>
    <div id="map"></div>
    <div class="button-group">
      <button @click="changeSize(0)">Hide</button>
      <button @click="changeSize(400)">show</button>
      <button @click="displayMarker(markerPositions1)">marker set 1</button>
      <button @click="displayMarker(markerPositions2)">marker set 2</button>

      <!-- 
      <button @click="displayMarker([])">marker set 3 (empty)</button> -->
      <button @click="displayInfoWindow">infowindow</button>

      <div>
        <form @submit.prevent="searchPlaces">
          키워드 :
          <input type="text" v-model="keyword" id="keyword" size="15" />
          <button type="submit">검색하기</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRaw, ref, onMounted } from "vue";
import { searchListStore } from "src/stores/example-store";
const infowindow = ref(null);
const store = searchListStore();

let map;
let ps;

let markers = ref([]);

const keyword = ref("이태원");

const markerPositions1 = ref([
  [33.452278, 126.567803],
  [33.452671, 126.574792],
  [33.451744, 126.572441],
]);

const markerPositions2 = ref([
  [37.499590490909185, 127.0263723554437],
  [37.499427948430814, 127.02794423197847],
  [37.498553760499505, 127.02882598822454],
  [37.497625593121384, 127.02935713582038],
  [37.49629291770947, 127.02587362608637],
  [37.49754540521486, 127.02546694890695],
  [37.49646391248451, 127.02675574250912],
]);

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(initMap);

    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6db43cbd5aa9d740e67c59d2869dcd49&libraries=services";
    document.head.appendChild(script);
  }
});

const searchPlaces = () => {
  console.log(keyword.value, "DFSFSDFSDFDS");
  ps.keywordSearch(keyword.value, placesSearchCB);
};

const placesSearchCB = (data, status, pagination) => {
  //ㄴ나중에 status 처리 해야함
  console.log(data);
  store.savelist(data);
  console.log(data[0].x, "+=======");
  //////
  //   for (let i = 0; i < data.length; i++) {
  //     testarr.value.push([parseFloat(data[i].x), parseFloat(data[i].y)]);
  //   }
  //   console.log(testarr.value, "test");
  displayMarker(data);
};

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), //여기에서 앞페이지에 넘어온 지역의 위도 경도값 넣어줘야함.
    level: 5,
  };

  //지도 객체를 등록합니다.
  //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  map = new kakao.maps.Map(container, options);
  ps = new kakao.maps.services.Places();
  //ps = new kakao.maps.services.Places();
  //   console.log(map, "THIS");
};

const changeSize = (size) => {
  const container = document.getElementById("map");
  container.style.width = `${size}px`;
  container.style.height = `${size}px`;
  toRaw(map).relayout();
};

const displayMarker = (markerPositions) => {
  //   console.log(markerPositions, "MARKER");
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }

  const p = markerPositions.map((x) => console.log(x, x.x, "HELLO"));

  const positions = markerPositions.map(
    (position) => new kakao.maps.LatLng(position.y, position.x)
  );
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
};
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
  height: 700px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
