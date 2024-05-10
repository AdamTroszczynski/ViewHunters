<template>
  <div>
    <IonInput
      v-model="value"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      class="mainInput"
    >
    </IonInput>
    <div v-if="errorMessage" slot="label">
      <span class="mainInput__error"> - {{ errorMessage }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonInput } from '@ionic/vue';
import type { TextFieldTypes } from '@ionic/core';
import { PropType } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<TextFieldTypes>,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
});

/** Catch value and errors from field (input component) */
const { errorMessage, value } = useField<string>(() => props.name);
</script>

<style lang="scss" scoped>
.mainInput {
  --padding-start: 25px;
  --padding-top: 10px;
  --padding-end: 25px;
  --padding-bottom: 10px;
  --highlight-color-focused: none;
  min-height: 0;
  height: 42px;
  width: 100%;
  color: black;
  background-color: white;
  font-family: $poppins;
  font-weight: 500;
  font-size: 0.75rem;
  border: 1px solid rgba(41, 59, 79, 0.5);
  border-radius: 8px;

  &__error {
    color: #ff6262;
    font-family: $poppins;
    font-size: 0.75rem;
  }
}
</style>
