<template>
  <div class="filterSection">
    <span class="filterSection__text">Filters</span>
    <ActionButton :is-orange="true" class="filterSection__placeBtn"
      >Buildings</ActionButton
    >
    <ActionButton :is-green="true" class="filterSection__scopeBtn"
      >To 5 km</ActionButton
    >
  </div>
</template>

<script setup lang="ts">
import ActionButton from '@/components/buttons/ActionButton.vue';
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
}
</style>
