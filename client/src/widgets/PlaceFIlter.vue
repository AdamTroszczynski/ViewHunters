<template>
  <div class="filterSection">
    <span class="filterSection__text">Filters</span>
    <ActionButton
      :is-orange="true"
      class="filterSection__placeBtn"
      @click-action="showPlaces()"
      >{{ store.selectedCategory }}</ActionButton
    >
    <ActionButton
      :is-green="true"
      class="filterSection__scopeBtn"
      @click-action="showSlider()"
      >{{ `To ${store.selectedDistanse} km` }}</ActionButton
    >
    <template v-if="isSliderShowed">
      <ion-range
        aria-label="Volume"
        class="filterSection__slider"
        @ionChange="distanseChange"
      ></ion-range>
    </template>
  </div>
</template>

<script setup lang="ts">
import ActionButton from '@/components/buttons/ActionButton.vue';
import { ref, type Ref } from 'vue';
import { usePlaceStore } from '@/stores/placeStore';

const store = usePlaceStore();

const isPlacesShowed: Ref<Boolean> = ref(false);
const isSliderShowed: Ref<Boolean> = ref(false);

/** Show menu with places after click */
const showPlaces = () => {
  isPlacesShowed.value = !isPlacesShowed.value;
};

/** Show slider after click */
const showSlider = () => {
  isSliderShowed.value = !isSliderShowed.value;
};

const distanseChange = (val: any) => {
  const { detail } = val;
  store.selectedDistanse = detail.value;
};
</script>

<style lang="scss" scoped>
.filterSection {
  height: 60px;
  width: 100%;
  background: white;
  box-shadow: 0 6px 12px rgba($mediumGray, 0.15);
  border-top: 1px solid rgba(55, 65, 74, 0.15);
  position: fixed;
  padding: 15px 44px;
  display: flex;
  align-items: center;
  gap: 38px;

  &__text {
    font-weight: 500;
    font-family: $poppins;
    font-size: 0.9375rem;
    user-select: none;
  }

  &__placeBtn {
    width: 85px;
    position: relative;

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 1px;
      background: rgba(55, 65, 74, 0.15);
      height: 100%;
      top: 0;
      left: -25%;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 1px;
      background: rgba(55, 65, 74, 0.15);
      height: 100%;
      top: 0;
      left: 125%;
    }
  }

  &__scopeBtn {
    width: 76px;
  }

  &__slider {
    position: absolute;
    width: 100px;
    left: 65%;
    top: 100%;
    --bar-height: 3px;
  }
}
</style>
