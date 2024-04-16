<template>
  <IonSelect
    :aria-label="label"
    :value="startingValue"
    interface="popover"
    class="selectButton"
    :class="isGreen ? 'selectButton--is-green' : ''"
  >
    <IonSelectOption v-for="option in options" :key="option" :value="option">{{
      option
    }}</IonSelectOption>
  </IonSelect>
</template>

<script setup lang="ts">
import { IonSelect, IonSelectOption } from '@ionic/vue';
defineProps({
  options: {
    type: Array<string>,
    required: true,
  },
  startingValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  isGreen: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.selectButton {
  --border-radius: 8px;
  --background: #f48516;
  --padding-top: 0.3125rem;
  --padding-bottom: 0.3125rem;
  --highlight-color-focused: none;
  height: 25px;
  min-height: 0;
  min-width: 85px;
  text-transform: none;
  font-family: $poppins;
  color: white;
  font-size: 0.63rem;
  font-weight: bold;

  &--is-green {
    --background: #13dac0;
  }
}
ion-select::part(icon) {
  display: none;
}

ion-select::part(text) {
  min-width: 85px;
  text-align: center;
}
</style>
