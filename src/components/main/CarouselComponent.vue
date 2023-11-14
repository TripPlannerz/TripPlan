<script setup>
import { ref } from "vue";

/* scroll style */
const thumbStyle = {
  right: "4px",
  borderRadius: "5px",
  backgroundColor: "#ffc436",
  width: "5px",
  opacity: 0.75,
};

const barStyle = {
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#ffc436",
  width: "9px",
  opacity: 0.2,
};

/* ========================= */

const inputPlace = ref("");
const slide = ref(1);
const autoplay = ref(false);

/* sample data */
const imgList = ref([
  { id: 1, src: "src/assets/img/jeju.jpg" },
  { id: 2, src: "src/assets/img/busan.jpg" },
  { id: 3, src: "src/assets/img/seoul.jpg" },
  { id: 4, src: "src/assets/img/gyeongju.jpg" },
]);

const placeList = ref([
  { id: 1, name: "제주" },
  { id: 2, name: "부산" },
  { id: 3, name: "서울" },
  { id: 4, name: "경주" },
  { id: 5, name: "여수" },
  { id: 6, name: "전주" },
  { id: 7, name: "강릉" },
  { id: 8, name: "일산" },
  { id: 9, name: "대전" },
  { id: 10, name: "속초" },
]);

/* =================== */

const onPlaceClick = () => {
  console.log(event.target);
  // 클릭한 아이템 정보로 모달창 띄우기
};
</script>

<template>
  <div>
    <q-carousel
      class="relative-position"
      animated
      v-model="slide"
      arrows
      navigation
      infinite
      _:autoplay="autoplay"
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      height="100vh"
      width="100%"
      bordered
    >
      <q-carousel-slide
        class="dimmed"
        v-for="img in imgList"
        :key="img.id"
        :name="img.id"
        :img-src="img.src"
      >
        <!-- input  -->
        <div class="input-place absolute-center z-top">
          <q-input
            color="white"
            rounded
            bottom-slots
            v-model="inputPlace"
            label="여행지 검색"
            dark
          >
            <template v-slot:prepend>
              <q-icon name="place" color="accent" />
            </template>
            <template v-slot:append>
              <q-icon
                name="search"
                @click="inputPlace = ''"
                class="cursor-pointer"
              />
            </template>
          </q-input>

          <!-- 검색 결과 list -->
          <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle">
            <q-list class="place-list">
              <q-item
                v-for="place in placeList"
                :key="place.id"
                @click.prevent="onPlaceClick"
                clickable
                v-ripple
              >
                <q-item-section>{{ place.name }}</q-item-section>
                <q-item-section avatar>
                  <q-icon name="place" color="grey" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<style scoped>
.input-place {
  width: 30%;
}

.place-list {
  width: 100%;
  background-color: #f0f0f0;
  font-weight: 600;
  box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07),
    0 10px 20px -2px rgba(0, 0, 0, 0.04);
}

.q-scrollarea {
  height: 200px;
  border-radius: 0.5rem;
}
</style>
