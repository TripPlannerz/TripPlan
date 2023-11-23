<template>
  <div>
    <div id="map"></div>
    <div class="button-group">
      <!-- <button @click="changeSize(0)">Hide</button>
      <button @click="changeSize(400)">show</button>
      <button @click="displayMarker(markerPositions1)">marker set 1</button>
      <button @click="displayMarker(markerPositions2)">marker set 2</button> -->

      <!-- <button @click="displayMarker([])">marker set 3 (empty)</button>
      <button @click="displayInfoWindow">infowindow</button> -->
    </div>
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
const x = ref("");
const y = ref("");

let map;
let ps;
let geocoder;
let coords;
let markers = ref([]);

const keyword = ref("이태원");

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
    // settingInitialPos();
  } else {
    console.log("맵 처음이잖아");
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

/////이거 삭제///
const searchPlaces = () => {
  console.log(keystore.keywordlist, "DFSFSDFSDFDS");
  ps.keywordSearch(keyword.value, placesSearchCB);
};

watchEffect(() => {
  console.log("myData 값이 변경되었습니다. 새로운 값:", keystore.keywordlist);
  keyword.value = keystore.keywordlist;
  console.log(keyword.value);

  if (ps && ps.keywordSearch) {
    ps.keywordSearch(keyword.value, placesSearchCB);
  } else {
    console.error("ps 객체 또는 keywordSearch 메소드가 정의되지 않았습니다.");
  }

  // 추가로 필요한 로직 수행
});

const placesSearchCB = (data, status, pagination) => {
  //ㄴ나중에 status 처리 해야함
  console.log(data);
  store.savelist(data);

  // displayMarker(data);
};

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

const displayMarker = (markerPositions) => {
  //   console.log(markerPositions, "MARKER");

  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }

  const positions = markerPositions.map((position) => {
    return new kakao.maps.LatLng(position.y, position.x);
  });
  const infos = markerPositions.map((info) => {
    return new kakao.maps.InfoWindow({
      content: info.place_name,
    });
  });

  // const positions = markerPositions.map(
  //   (position) => new kakao.maps.LatLng(position.y, position.x)
  // );
  //console.log(positions, "POS");

  if (positions.length > 0) {
    markers.value = positions.map((position, i) => {
      const marker = new kakao.maps.Marker({
        map: toRaw(map),

        position,
      });
      kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, infos[i])
      );
      kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infos[i])
      );
      return marker;
    });

    const bounds = positions.reduce(
      (bounds, latlng) => bounds.extend(latlng),
      new kakao.maps.LatLngBounds()
    );

    toRaw(map).setBounds(bounds);
  }
};

const makeOverListener = (map, marker, infowindow) => {
  return function () {
    infowindow.open(map, marker);
  };
};

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
const makeOutListener = (infowindow) => {
  return function () {
    infowindow.close();
  };
};

watchEffect(() => {
  // keyword.value = keystore.saveaddlist;
  // console.log(keyword.value);

  // if (ps && ps.keywordSearch) {
  //   ps.keywordSearch(keyword.value, placesSearchCB);
  // } else {
  //   console.error("ps 객체 또는 keywordSearch 메소드가 정의되지 않았습니다.");
  // }

  displayMarker(keystore.addlist);
  console.log(keystore.addlist, "@@@@");

  // 추가로 필요한 로직 수행
});

////////
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
