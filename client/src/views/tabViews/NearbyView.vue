<template>
  <IonPage>
    <div class="nearbyView">
      <HeroBanner :is-filters="true" />
      <PlaceFilter />
      <div class="nearbyView__container">
        <TitleLabel class="nearbyView__title">Places Nearby</TitleLabel>
        <NearbyPlaces />
      </div>
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue';

import HeroBanner from '@/components/common/HeroBanner.vue';
import PlaceFilter from '@/widgets/PlaceFilter.vue';
import NearbyPlaces from '@/widgets/NearbyPlaces.vue';
import TitleLabel from '@/components/labels/TitleLabel.vue';
</script>

<style lang="scss" scoped>
.nearbyView {
  width: 100%;
  height: 100%;

  &__title {
    margin-top: 30px;
  }

  &__container {
    width: 100%;
    height: calc(100% - 155px);
    overflow-y: scroll;
    padding: 0px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}
::-webkit-scrollbar {
  width: 0px;
}
</style>
