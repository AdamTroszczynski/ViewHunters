import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { useUserStore } from './userStore';
import { getPlaces } from '@/services/placeServices';
import type { Place } from '@/types/Place';

export const usePlaceStore = defineStore('placeStore', () => {
  const userStore = useUserStore();
  const selectedCategory: Ref<string> = ref('Buildings');
  const selectedDistanse: Ref<number> = ref(5); // REFACTOR: Replace hard-coded values with enums
  const localization: Ref<any> = ref({ width: 51, height: 17 });

  const places: Ref<Place[]> = ref([]);
  const exploredPlaces: Ref<Place[]> = ref([]);

  const getDistance = (place: Place): number => {
    return Math.sqrt(
      Math.pow(place.geoWidth - localization.value.width, 2) +
        Math.pow(place.geoHeight - localization.value.height, 2),
    );
  };

  const loadPlaces = async () => {
    const result = await getPlaces(
      localization.value.width,
      localization.value.height,
      userStore.token,
    );
    places.value = result;
  };

  const loadExploredPlaces = async () => {};

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
