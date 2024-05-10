<template>
  <IonApp class="viewHuntersApp">
    <IonRouterOutlet />
  </IonApp>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { usePlaceStore } from '@/stores/placeStore';
import { onMounted } from 'vue';

const placeStore = usePlaceStore();

onMounted(() => {
  setInterval(placeStore.loadLocalization, 10000);
});
</script>

<style lang="scss">
.viewHuntersApp {
  background-color: $lightGray;
}
</style>
