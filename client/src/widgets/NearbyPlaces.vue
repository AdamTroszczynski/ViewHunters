<template>
  <IonList
    class="nearbyPlaces"
    :class="filterPlaces.length < 3 ? 'nearbyPlaces--is-maxTwo' : ''"
  >
    <TransitionGroup name="list">
      <IonItem
        v-for="place in filterPlaces"
        :key="place.id"
        class="nearbyPlaces__item"
      >
        <NearbyCard
          :id="place.id"
          :photo="place.photo[0]"
          :distance="placeStore.getDistance(place)"
          :label="place.name"
          :is-discovered="checkPlace(place)"
          @click-action="choosePath($event, checkPlace(place))"
        ></NearbyCard>
      </IonItem>
    </TransitionGroup>
  </IonList>
</template>

<script setup lang="ts">
import { IonList, IonItem, useIonRouter } from '@ionic/vue';
import { computed, onBeforeMount } from 'vue';
import type Place from '@/types/Place';
import { usePlaceStore } from '@/stores/placeStore';
import { forwardAnimation } from '@/animations/navigateAnimations';

import NearbyCard from '@/components/cards/NearbyCard.vue';

const placeStore = usePlaceStore();
const router = useIonRouter();

/** Filter and sort places from store
 * @return {Places[]}
 */
const filterPlaces = computed<Place[]>(() => {
  let filterArray = placeStore.nearbyPlaces.filter(
    (el) => el.category === placeStore.selectedCategory,
  );
  filterArray = filterArray.filter(
    (el) => placeStore.getDistance(el) <= placeStore.selectedDistanse,
  );
  return filterArray.sort((a: Place, b: Place): number => {
    return placeStore.getDistance(a) - placeStore.getDistance(b);
  });
});

/** Check if place is Explored
 * @param {Place} place Place to check
 * @returns {boolean} Place is explored
 */
const checkPlace = (place: Place): boolean => {
  return (
    placeStore.exploredPlaces.findIndex(
      (exploredPlace: Place) => exploredPlace.id === place.id,
    ) !== -1
  );
};

/** Redirect to correct path
 * @param {number} id Place's id
 * @param {boolean} isDiscovered If place is discovered
 */
const choosePath = (id: number, isDiscovered: boolean): void => {
  if (isDiscovered) {
    router.navigate(`/placeDetail/${id}`, 'forward', 'push', forwardAnimation);
  } else {
    router.navigate(`/placeUnlock/${id}`, 'forward', 'push', forwardAnimation);
  }
};

onBeforeMount(async (): Promise<void> => {
  await placeStore.loadExploredPlaces();
  await placeStore.loadNearbyPlaces();
});
</script>

<style lang="scss" scoped>
.nearbyPlaces {
  height: min-content;
  padding: 0px;
  background: none;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &--is-maxTwo {
    min-height: 80%;
  }

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
