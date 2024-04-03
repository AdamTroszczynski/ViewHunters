<template>
  <ion-button class="actionButton">
    <slot name="icon"></slot>
    <ion-label><slot name="label"></slot></ion-label>
  </ion-button>
</template>

<script setup lang="ts">
defineProps({
  isGreen: {
    type: Boolean,
    default: false,
  },
  isOrange: {
    type: Boolean,
    default: false,
  },
  isBlackOrange: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.actionButton {
  width: 100%;
  padding: 0.5rem;
}
</style>
