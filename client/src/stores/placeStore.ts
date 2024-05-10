import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { getNearbyPlaces } from '@/services/placeServices';
import type Place from '@/types/Place';
import { Category, Distance } from '@/enums/placeEnum';

export const usePlaceStore = defineStore('placeStore', () => {
  const userStore = useUserStore();

  const selectedCategory: Ref<string> = ref(Category.buildings);
  const selectedDistanse: Ref<number> = ref(Distance.short);

  const localization: Ref<any> = ref({ width: 51, height: 17 });

  const nearbyPlaces: Ref<Place[]> = ref([]);
  const exploredPlaces: Ref<Place[]> = ref([]);

  /** Load nearby places  */
  const loadNearbyPlaces = async (): Promise<void> => {
    const result = await getNearbyPlaces(
      localization.value.width,
      localization.value.height,
      userStore.token,
    );
    nearbyPlaces.value = result;
  };

  /** Load explored places */
  const loadExploredPlaces = async () => {};

  /** Get distance to place
   * @param {Place} place Place object
   * @returns {number} Distance to place in km
   */
  const getDistance = (place: Place): number => {
    return Math.sqrt(
      Math.pow(place.geoWidth - localization.value.width, 2) +
        Math.pow(place.geoHeight - localization.value.height, 2),
    );
  };

  return {
    selectedCategory,
    selectedDistanse,
    nearbyPlaces,
    exploredPlaces,
    loadNearbyPlaces,
    loadExploredPlaces,
    getDistance,
  };
});
