<template>
  <IonButton
    class="actionButton"
    :class="[
      isGreen ? 'actionButton--is-green' : '',
      isOrange ? 'actionButton--is-orange' : '',
      isBlackOrange ? 'actionButton--is-blackOrange' : '',
    ]"
    @click="emitClickEvent()"
  >
    <div class="actionButton__content">
      <div v-if="icon !== ''" class="actionButton__icon">
        <component :is="setIcon"></component>
      </div>
      <div class="actionButton__text"><slot></slot></div>
    </div>
  </IonButton>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import { computed, type Component } from 'vue';
import ArrowIcon from '@/components/icons/usesIcons/ArrowIcon.vue';
import CheckIcon from '@/components/icons/usesIcons/CheckIcon.vue';
import CodeIcon from '@/components/icons/usesIcons/CodeIcon.vue';
import LocationIcon from '@/components/icons/usesIcons/LocationIcon.vue';
import MapIcon from '@/components/icons/usesIcons/MapIcon.vue';

const props = defineProps({
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
  icon: {
    type: String,
    default: '',
    validator(val: string): boolean {
      return ['arrow', 'check', 'code', 'location', 'map', ''].includes(val);
    },
  },
});

/** Choose icon to button
 * @returns {Component}
 */
const setIcon = computed<Component | null>(() => {
  switch (props.icon) {
    case 'arrow':
      return ArrowIcon;
    case 'check':
      return CheckIcon;
    case 'code':
      return CodeIcon;
    case 'location':
      return LocationIcon;
    case 'map':
      return MapIcon;
    default:
      return null;
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
.actionButton {
  --border-radius: 8px;
  --width: 100%;
  --background: #293b4f;
  --padding-start: 1.125rem;
  --padding-end: 1.125rem;
  --padding-top: 0.3125rem;
  --padding-bottom: 0.3125rem;
  --box-shadow: none;
  min-width: 100%;
  height: 25px;
  min-height: 0;
  text-transform: none;
  font-family: $poppins;

  &__content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
  }
  &__icon {
    height: 12px;
    width: 12px;
  }
  &__text {
    font-family: $poppins;
    font-size: 0.63rem;
    font-weight: bold;
  }
  &--is-green {
    --background: #13dac0;
  }
  &--is-orange {
    --background: #f48516;
  }
  &--is-blackOrange {
    --background: none;
    --border-width: 2px;
    --border-style: solid;
    --border-color: #f48516;
    color: #f48516;
  }
}
</style>
