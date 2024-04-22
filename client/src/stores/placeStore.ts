import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { Place } from '@/types/Place';

export const usePlaceStore = defineStore('placeStore', () => {
  const selectedCategory: Ref<string> = ref('Buildings');
  const selectedDistanse: Ref<number> = ref(5);

  const places: Ref<Place[]> = ref([]);

  const setPlaces = (placeArray: Place[]) => {
    return (places.value = placeArray);
  };

  return { selectedCategory, selectedDistanse, places, setPlaces };
});
