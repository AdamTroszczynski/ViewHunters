<template>
  <form class="mainForm">
    <div class="mainForm__container">
      <TitleLabel class="mainForm__title"
        ><slot name="title"></slot
      ></TitleLabel>
      <slot name="inputs"></slot>
    </div>
    <ActionButton
      :is-green="true"
      :icon="'check'"
      @click-action="emitAuthAction"
      ><slot name="button"></slot
    ></ActionButton>
  </form>
</template>

<script setup lang="ts">
import TitleLabel from '@/components/labels/TitleLabel.vue';
import ActionButton from '@/components/buttons/ActionButton.vue';

const emit = defineEmits<{
  /** Emit submit event */
  (e: 'onSubmit'): void;
}>();

/** Emit submit event */
const emitAuthAction = (): void => emit('onSubmit');
</script>

<style lang="scss" scoped>
.mainForm {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  &__title {
    margin-bottom: 1rem;
  }
}
</style>
