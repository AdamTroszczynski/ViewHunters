<template>
  <div class="exploredCard" @click="emitClickEvent">
    <div
      class="exploredCard__photo"
      :style="`background-image: url(${photo})`"
    ></div>
    <DetailLabel class="exploredCard__label">{{ label }}</DetailLabel>
  </div>
</template>

<script setup lang="ts">
import DetailLabel from '@/components/labels/DetailLabel.vue';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
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
.exploredCard {
  width: 100%;
  height: 142px;
  display: flex;
  flex-direction: column;

  &__photo {
    width: 100%;
    min-height: 120px;
    border-radius: 8px;
    background-size: cover;
    background-position: center;
  }

  &__label {
    min-height: 17px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-inline: 0px;
  }
}
</style>
