<template>
  <swiper-container
    :pagination="true"
    :pagination-dynamic-bullets="true"
    :slides-per-view="1"
    :space-between="15"
    class="photoGallery"
  >
    <swiper-slide v-for="photo in photos" :key="photo"
      ><div
        :style="`background-image: url(${photo})`"
        class="photoGallery__photo"
      ></div
    ></swiper-slide>
  </swiper-container>
</template>

<script setup lang="ts">
defineProps({
  photos: {
    type: Array<string>,
    required: true,
  },
});
</script>
<style lang="scss" scoped>
.photoGallery {
  width: 100%;
  height: 183px;
  position: relative;

  &__photo {
    width: 100%;
    height: 100%;
    background-size: cover;
    border-radius: 8px;
  }

  &__iconL {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 40%;
    left: 5%;
  }

  &__iconR {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 40%;
    right: 5%;
  }
}
</style>
