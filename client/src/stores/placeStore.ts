import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { getExploredPlaces, getPlaces } from '@/testPlaces';
import type { Place } from '@/types/Place';

export const usePlaceStore = defineStore('placeStore', () => {
  const selectedCategory: Ref<string> = ref('Buildings');
  const selectedDistanse: Ref<number> = ref(5); // REFACTOR: Replace hard-coded values with enums
  const localization: Ref<any> = ref({ width: 5, height: 5 });

  const places: Ref<Place[]> = ref([]);

  const exploredPlaces: Ref<Place[]> = ref([]);

  const getDistance = (place: Place): number => {
    return Math.sqrt(
      Math.pow(place.geoWidth - localization.value.width, 2) +
        Math.pow(place.geoHeight - localization.value.height, 2),
    );
  };

  const loadPlaces = async () => {
    const result = getPlaces();
    places.value = result;
  };

  const loadExploredPlaces = async () => {
    if (exploredPlaces.value.length !== 0) return;
    const result = getExploredPlaces();
    exploredPlaces.value = result;
  };

  return {
    selectedCategory,
    selectedDistanse,
    places,
    exploredPlaces,
    loadPlaces,
    loadExploredPlaces,
    getDistance,
  };
});
