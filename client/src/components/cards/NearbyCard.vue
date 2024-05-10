<template>
  <div class="nearbyCard" @click="emitClickEvent">
    <div
      class="nearbyCard__photo"
      :class="!isDiscovered ? 'nearbyCard__photo--is-hidden' : ''"
      :style="`background-image: url(${photo})`"
    ></div>
    <DetailLabel class="nearbyCard__label">{{ label }}</DetailLabel>
    <div class="nearbyCard__buttons">
      <ActionButton :icon="'location'" class="nearbyCard__locationBtn"
        >{{ `${distance.toFixed(2)} km` }}
      </ActionButton>
      <ActionButton
        v-if="isDiscovered"
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

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
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
  isDiscovered: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  /** Emit event after click button */
  (e: 'clickAction', id: number): void;
}>();

/** Emit click action event */
const emitClickEvent = () => emit('clickAction', props.id);
</script>

<style lang="scss" scoped>
.nearbyCard {
  height: 150px;
  position: relative;
  width: 100%;

  &__photo {
    height: 120px;
    background-size: cover;
    background-position: center;
    border-radius: 8px;

    &--is-hidden {
      opacity: 0.4;
    }
  }

  &__label {
    position: absolute;
    top: 0;
  }

  &__buttons {
    display: flex;
  }

  &__locationBtn {
    --width: 88px;
    min-width: 88px;
  }

  &__statusBtn {
    width: 100%;
    min-width: 242px;
  }
}
</style>
