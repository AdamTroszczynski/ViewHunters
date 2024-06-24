<template>
  <IonList class="exploredPlaces">
    <TransitionGroup name="list">
      <IonItem
        v-for="place in placeStore.exploredPlaces"
        :key="place.id"
        class="exploredPlaces__item"
      >
        <ExploredCard
          :id="place.id"
          :label="place.name"
          :photo="place.photo[0]"
          @click-action="goToDetails"
        />
      </IonItem>
    </TransitionGroup>
  </IonList>
</template>

<script setup lang="ts">
import { IonList, IonItem, useIonRouter } from '@ionic/vue';
import { onBeforeMount } from 'vue';
import { usePlaceStore } from '@/stores/placeStore';
import { forwardAnimation } from '@/animations/navigateAnimations';

import ExploredCard from '@/components/cards/ExploredCard.vue';

const placeStore = usePlaceStore();
const router = useIonRouter();

/**
 * Move to /placeDetail/id path
 * @param {number} id Place's id
 */
const goToDetails = (id: number): void => {
  router.navigate(`/placeDetail/${id}`, 'forward', 'push', forwardAnimation);
};

onBeforeMount(() => {
  placeStore.loadExploredPlaces();
});
</script>

<style lang="scss" scoped>
.exploredPlaces {
  min-height: min-content;
  padding: 0px;
  background: none;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__item {
    --inner-border-width: 0px;
    --width: 100%;
    --background: none;
    --border: none;
    --padding-start: 0px;
    --inner-padding-end: 0px;
  }
  .list-enter-active {
    transition: all 0.5s ease;
  }
  .list-enter-from {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
