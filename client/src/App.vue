<template>
  <IonApp class="viewHuntersApp">
    <HeroBanner />
    <IonRouterOutlet class="viewHuntersApp__router" />
  </IonApp>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';

import HeroBanner from '@/components/common/HeroBanner.vue';
</script>

<style lang="scss">
.viewHuntersApp {
  background-color: $lightGray;

  &__router {
    margin-top: 96px;
  }
}
</style>
