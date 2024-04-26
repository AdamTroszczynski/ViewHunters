<template>
  <IonList
    class="nearbyPlaces"
    :class="filterPlaces.length < 3 ? 'nearbyPlaces--is-maxTwo' : ''"
  >
    <TransitionGroup name="list">
      <IonItem
        class="nearbyPlaces__item"
        v-for="place in filterPlaces"
        :key="place.id"
      >
        <NearbyCard
          :id="place.id"
          :photo="place.photo[0]"
          :distance="store.getDistance(place)"
          :label="place.name"
          :is-discovered="place.isDiscovered"
          @click-action="choosePath($event, place.isDiscovered)"
        ></NearbyCard>
      </IonItem>
    </TransitionGroup>
  </IonList>
</template>

<script setup lang="ts">
import { IonList, IonItem } from '@ionic/vue';
import { computed, onBeforeMount } from 'vue';
import { usePlaceStore } from '@/stores/placeStore';
import { forwardAnimation } from '@/animations/navigateAnimations';
import { useIonRouter } from '@ionic/vue';
import type { Place } from '@/types/Place';
import getPlaces from '@/testPlaces';
import NearbyCard from '@/components/cards/NearbyCard.vue';

const store = usePlaceStore();
const router = useIonRouter();

/** Redirect to correct path
 * @param {number} id - Place's id
 * @param {boolean} isDiscovered - If place is discorvered
 */
const choosePath = (id: number, isDiscovered: boolean) => {
  if (isDiscovered) {
    router.navigate(`/placeDetail/${id}`, 'forward', 'push', forwardAnimation);
  } else {
    router.navigate(`/placeUnlock/${id}`, 'forward', 'push', forwardAnimation);
  }
};

/** Choose where redirect */
const choosePath = (id: number, isDiscovered: boolean) => {
  if (isDiscovered) {
    router.navigate(`/placeDetail/${id}`, 'forward', 'push', forwardAnimation);
  } else {
    router.navigate(`/placeUnlock/${id}`, 'forward', 'push', forwardAnimation);
  }
};

/** Filter places from store
 * @return {Places[]}
 */
const filterPlaces = computed<Place[]>(() => {
  const filterArray = store.places.filter(
    (el) => el.category === store.selectedCategory,
  );
  return filterArray.filter(
    (el) => store.getDistance(el) <= store.selectedDistanse,
  );
});

onBeforeMount(() => {
  const result = getPlaces(); // CONNECT SERVICE HERE
  store.setPlaces(result);
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
