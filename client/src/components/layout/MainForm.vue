<template>
  <form class="mainForm" @keyup.enter="emitAuthAction()">
    <div class="mainForm__container">
      <TitleLabel class="mainForm__title"
        ><slot name="title"></slot
      ></TitleLabel>
      <slot name="inputs"></slot>
      <div class="mainForm_button">
        <ActionButton
          class="mainForm__btn"
          :is-green="true"
          :icon="'check'"
          @click-action="emitAuthAction"
          ><slot name="button"></slot
        ></ActionButton>
      </div>
    </div>
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

  &__btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
