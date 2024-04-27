<template>
  <IonPage>
    <div class="exploredView">
      <HeroBanner :is-filters="true" />
      <PlaceFilter />
      <div class="exploredView__container">
        <TitleLabel class="exploredView__title">Explored</TitleLabel>
        <ExploredPlaces />
      </div>
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import HeroBanner from '@/components/common/HeroBanner.vue';
import PlaceFilter from '@/widgets/PlaceFilter.vue';
import ExploredPlaces from '@/widgets/ExploredPlaces.vue';
import TitleLabel from '@/components/labels/TitleLabel.vue';
</script>

<style lang="scss" scoped>
.exploredView {
  width: 100%;
  height: 100%;

  &__title {
    margin-top: 30px;
  }

  &__container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 0px 20px 160px 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}
::-webkit-scrollbar {
  width: 0px;
}
</style>
