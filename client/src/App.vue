<template>
  <IonApp class="viewHuntersApp">
    <IonRouterOutlet />
  </IonApp>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>

<style lang="scss">
.viewHuntersApp {
  background-color: $lightGray;
}
</style>
