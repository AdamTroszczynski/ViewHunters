import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { Place } from '@/types/Place';

export const usePlaceStore = defineStore('placeStore', () => {
  const selectedCategory: Ref<string> = ref('Buildings');
  const selectedDistanse: Ref<number> = ref(5);
  const localization: Ref<any> = ref({ width: 5, height: 5 });

  const places: Ref<Place[]> = ref([]);

  const setPlaces = (placeArray: Place[]) => {
    return (places.value = placeArray);
  };

  const getDistance = (place: Place): number => {
    return Math.sqrt(
      Math.pow(place.geoWidth - localization.value.width, 2) +
        Math.pow(place.geoHeight - localization.value.height, 2),
    );
  };

  return {
    selectedCategory,
    selectedDistanse,
    places,
    setPlaces,
    getDistance,
    localization,
  };
});
