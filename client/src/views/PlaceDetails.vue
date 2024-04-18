<template>
  <div class="placeDetails">
    <HeroBanner />
    <div class="placeDetails__container">
      <div>
        <div class="placeDetails__photo"></div>
        <div class="placeDetails__title"></div>
        <p class="placeDetails__text"></p>
      </div>
      <ActionButton :icon="'arrow'">Back</ActionButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroBanner from '@/components/common/HeroBanner.vue';
import ActionButton from '@/components/buttons/ActionButton.vue';
</script>
