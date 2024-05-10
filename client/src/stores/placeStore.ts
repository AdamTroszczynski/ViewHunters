import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { Geolocation } from '@capacitor/geolocation';
import { useUserStore } from '@/stores/userStore';
import { getNearbyPlaces } from '@/services/placeServices';
import type Place from '@/types/Place';
import type { GeoLocation } from '@/types/commonTypes';
import { Category, Distance } from '@/enums/placeEnum';

export const usePlaceStore = defineStore('placeStore', () => {
  const userStore = useUserStore();

  const selectedCategory: Ref<string> = ref(Category.buildings);
  const selectedDistanse: Ref<number> = ref(Distance.short);

  const localization: Ref<GeoLocation | null> = ref(null);

  const nearbyPlaces: Ref<Place[]> = ref([]);
  const exploredPlaces: Ref<Place[]> = ref([]);

  const loadLocalization = async () => {
    try {
      await Geolocation.checkPermissions();
      const coordinates = (await Geolocation.getCurrentPosition()).coords;
      localization.value = {
        geoWidth: coordinates.latitude,
        geoHeight: coordinates.longitude,
      };
    } catch (err) {
      alert('Please enable localization!');
    }
  };

  /** Load nearby places  */
  const loadNearbyPlaces = async (): Promise<void> => {
    if (!localization.value) await loadLocalization();
    if (localization.value) {
      const result = await getNearbyPlaces(
        localization.value.geoWidth,
        localization.value.geoHeight,
        userStore.token,
      );
      nearbyPlaces.value = result;
    }
  };

  /** Load explored places */
  const loadExploredPlaces = async () => {};

  /** Get distance to place
   * @param {Place} place Place object
   * @returns {number} Distance to place in km
   */
  const getDistance = (place: Place): number => {
    if (!localization.value) throw new Error('Localization does not exist');

    const R = 6371.0;

    const lat1 = toRadians(localization.value.geoWidth);
    const lon1 = toRadians(localization.value.geoHeight);
    const lat2 = toRadians(place.geoWidth);
    const lon2 = toRadians(place.geoHeight);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance;
  };

  /** Calculate degrees to radians
   * @param {number} degrees Degrees
   * @returns {number} Radians
   */
  const toRadians = (degrees: number): number => {
    return (degrees * Math.PI) / 180;
  };

  return {
    selectedCategory,
    selectedDistanse,
    nearbyPlaces,
    exploredPlaces,
    loadNearbyPlaces,
    loadExploredPlaces,
    getDistance,
    loadLocalization,
  };
});
