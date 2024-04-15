<template>
  <IonText class="titleLabel">
    <h1 class="titleLabel__header"><slot></slot></h1>
  </IonText>
</template>

<script setup lang="ts">
import { IonText } from '@ionic/vue';
</script>

<style lang="scss" scoped>
.titleLabel {
  &__header {
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 1.25rem;
    color: #37414a;
    margin: 0;
  }
}
</style>
