<template>
  <div class="nearbyCard">
    <div class="nearbyCard__photo" :style="`background-image: url(${photo})`">
      <DetailLabel class="nearbyCard__label">{{ label }}</DetailLabel>
    </div>
    <div class="nearbyCard__buttons">
      <ActionButton :icon="'location'" class="nearbyCard__locationBtn"
        >{{ `${distance} km` }}
      </ActionButton>
      <ActionButton
        v-if="isCompleted"
        :is-green="true"
        class="nearbyCard__statusBtn"
        >Completed</ActionButton
      >
      <ActionButton v-else :is-black-orange="true" class="nearbyCard__statusBtn"
        >Ready to hunt</ActionButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import DetailLabel from '@/components/labels/DetailLabel.vue';
import ActionButton from '@/components/buttons/ActionButton.vue';

defineProps({
  photo: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.nearbyCard {
  height: 150px;

  &__photo {
    height: 120px;
    background-size: cover;
    background-position: center;
    border-radius: 8px;
  }

  &__buttons {
    display: flex;
  }

  &__locationBtn {
    width: 88px;
  }

  &__statusBtn {
    width: 100%;
  }
}
</style>
