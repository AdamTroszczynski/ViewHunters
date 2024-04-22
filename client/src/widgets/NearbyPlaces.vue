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
        :is-discovered="place.isDiscovered"
      ></NearbyCard>
    </IonItem>
  </IonList>
</template>

<script setup lang="ts">
import { IonList, IonItem } from '@ionic/vue';
import { computed, onBeforeMount } from 'vue';
import { usePlaceStore } from '@/stores/placeStore';
import type { Place } from '@/types/Place';
import getPlaces from '@/testPlaces';
import NearbyCard from '@/components/cards/NearbyCard.vue';

const store = usePlaceStore();

// SET USER LOCATION INSTED OF THIS !!!!
const location = {
  width: 5,
  height: 5,
};

/** Filter places from store
 * @return {Places[]}
 */
const filterPlaces = computed<Place[]>(() => {
  const filterArray = store.places.filter(
    (el) => el.category === store.selectedCategory,
  );
  return filterArray.filter((el) => calcDistance(el) <= store.selectedDistanse);
});

/** Calculate distance from device location to place
 * @param {Place} place Place object
 * @returns {number} - Distance from device location to place
 */
const calcDistance = (place: Place): number => {
  return Math.sqrt(
    Math.pow(place.geoWidth - location.width, 2) +
      Math.pow(place.geoHeight - location.height, 2),
  );
};

onBeforeMount(() => {
  const result = getPlaces(); // CONNECT SERVICE HERE
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
