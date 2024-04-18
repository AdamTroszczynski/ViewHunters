<template>
  <IonList class="nearbyPlaces">
    <IonItem
      class="nearbyPlaces__item"
      v-for="place in filterPlaces"
      :key="place.name"
    >
      <NearbyCard
        :photo="place.photo[0]"
        :distance="calcDistance(place)"
        :label="place.name"
      ></NearbyCard>
    </IonItem>
  </IonList>
</template>

<script setup lang="ts">
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonItem,
} from '@ionic/vue';
import { computed, onBeforeMount } from 'vue';
import { usePlaceStore } from '@/stores/placeStore';
import type { Place } from '@/types/Place';
import getPlaces from '@/testPlaces';
import NearbyCard from '@/components/cards/NearbyCard.vue';

const store = usePlaceStore();

const location = {
  width: 5,
  height: 5,
};

const calcDistance = (place: Place): number => {
  return Math.sqrt(
    Math.pow(place.geoWidth - location.width, 2) +
      Math.pow(place.geoHeight - location.height, 2),
  );
};

/** Filter places from store
 * @return {Places[]}
 */
const filterPlaces = computed<Place[]>(() => {
  // Check category
  const filterArray = store.places.filter(
    (el) => el.category === store.selectedCategory,
  );
  return filterArray.filter(
    (el) =>
      Math.sqrt(
        Math.pow(el.geoWidth - location.width, 2) +
          Math.pow(el.geoHeight - location.height, 2),
      ) <= store.selectedDistanse,
  );
});

onBeforeMount(() => {
  const result = getPlaces();
  store.setPlaces(result);
});
</script>

<style lang="scss" scoped>
.nearbyPlaces {
  min-height: fit-content;
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
}
</style>
