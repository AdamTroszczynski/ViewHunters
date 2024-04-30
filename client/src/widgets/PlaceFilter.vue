<template>
  <div class="filterSection">
    <span class="filterSection__text">Filters</span>
    <SelectButton
      :starting-value="store.selectedCategory"
      :options="['Buildings', 'Bridges', 'Houses']"
      class="filterSection__placeBtn"
      @ion-change="setCategory($event)"
    ></SelectButton>
    <SelectButton
      :starting-value="convertDistance"
      :options="['To 5 km', 'To 10 km', 'To 15 km']"
      :is-green="true"
      class="filterSection__scopeBtn"
      @ion-change="setDistance($event)"
    >
    </SelectButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePlaceStore } from '@/stores/placeStore';

import SelectButton from '@/components/buttons/SelectButton.vue';

const store = usePlaceStore();

/** Convert selectedDistance from number to string
 * @return {string}
 */
const convertDistance = computed<string>(() => {
  return store.selectedDistanse == 5
    ? 'To 5 km'
    : store.selectedDistanse == 10
      ? 'To 10 km'
      : 'To 15 km';
});

/** Set selected category to store
 * @param {CustomEvent} ev selected category
 */
const setCategory = (ev: CustomEvent): void => {
  const { detail } = ev;
  store.selectedCategory = detail.value;
};

/** Convert and set selected distance to store
 * @param {CustomEvent} ev selected distance
 */
const setDistance = (ev: CustomEvent): void => {
  const { detail } = ev;
  store.selectedDistanse =
    detail.value == 'To 5 km' ? 5 : detail.value == 'To 10 km' ? 10 : 15;
};
</script>

<style lang="scss" scoped>
.filterSection {
  height: 60px;
  width: 100%;
  background: white;
  box-shadow: 0 6px 12px rgba($mediumGray, 0.15);
  border-top: 1px solid rgba(55, 65, 74, 0.15);
  padding: 15px 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 35px;

  &__text {
    font-weight: 500;
    font-family: $poppins;
    font-size: 0.9375rem;
    color: #37414a;
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
      left: -20%;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 1px;
      background: rgba(55, 65, 74, 0.15);
      height: 100%;
      top: 0;
      left: 120%;
    }
  }

  &__scopeBtn {
    width: 76px;
  }
}
</style>
