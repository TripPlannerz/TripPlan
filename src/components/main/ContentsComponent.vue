<script setup></script>

<template>
  <div class="q-pa-md">
    <div class="text-h3 text-center q-my-lg">컨텐츠</div>
    <div class="row justify-center q-gutter-sm">
      <q-intersection
        v-for="index in 10"
        :key="index"
        transition="scale"
        class="example-item"
      >
        <q-card class="q-mx-xl">
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />

          <q-card-section>
            <div class="text-h6">Card #{{ index }}</div>
            <div class="text-h6">여행지</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
        </q-card>
      </q-intersection>
    </div>
  </div>
</template>

<style scoped>
.example-item {
  height: 390px;
  width: 390px;
}
</style>
