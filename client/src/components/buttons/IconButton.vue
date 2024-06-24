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
import StatsIcon from '@/components/icons/StatsIcon.vue';

const props = defineProps({
  icon: {
    type: String,
    required: true,
    validator(val: string): boolean {
      return ['exit', 'github', 'stats'].includes(val);
    },
  },
});

/** Choose icon to button
 * @returns {Component} Icon's component
 */
const setIcon = computed<Component>(() => {
  switch (props.icon) {
    case 'exit':
      return ExitIcon;
    case 'github':
      return GithubIcon;
    case 'stats':
      return StatsIcon;
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
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  width: 25px;
  height: 25px;
  min-width: 25px;
  min-height: 25px;
  border: solid 1px $mediumGray;
  border-radius: 8px;

  &__icon {
    width: 15px;
    height: 12px;
    fill: $mediumGray;
  }
}
</style>
