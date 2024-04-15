<template>
  <IonButton class="iconButton" @click="emitClickEvent()">
    <component :is="setIcon" class="iconButton__icon"></component>
  </IonButton>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import { computed, type Component } from 'vue';
import ExitIcon from '@/components/icons/ExitIcon.vue';
import GithubIcon from '@/components/icons/GithubIcon.vue';

const props = defineProps({
  icon: {
    type: String,
    required: true,
    validator(val: string): boolean {
      return ['exit', 'github'].includes(val);
    },
  },
});

/** Choose icon to button
 * @returns {Component}
 */
const setIcon = computed<Component>(() => {
  switch (props.icon) {
    case 'exit':
      return ExitIcon;
    case 'github':
      return GithubIcon;
    default:
      return ExitIcon;
  }
});

const emit = defineEmits<{
  /** Emit event after click button */
  (e: 'clickAction'): void;
}>();

/** Emit click action event */
const emitClickEvent = () => emit('clickAction');
</script>

<style lang="scss" scoped>
.iconButton {
  --background: none;
  --padding-start: 8px;
  --padding-end: 6px;
  width: 29px;
  min-height: 29px;
  border: solid 1px $mediumGray;
  border-radius: 8px;

  &__icon {
    min-width: 15px;
    fill: $mediumGray;
  }
}
</style>
