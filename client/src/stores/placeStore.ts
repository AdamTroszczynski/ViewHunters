import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { Geolocation, Position } from '@capacitor/geolocation';
import { useUserStore } from '@/stores/userStore';
import { getNearbyPlaces, getExploredPlaces } from '@/services/placeServices';
import type Place from '@/types/Place';
import type { GeoLocation } from '@/types/commonTypes';
import { Category, Distance } from '@/enums/placeEnum';

export const usePlaceStore = defineStore('placeStore', () => {
  const userStore = useUserStore();

  const selectedCategory: Ref<string> = ref(Category.buildings);
  const selectedDistance: Ref<number> = ref(Distance.short);

  const localization: Ref<GeoLocation | null> = ref(null);

  const nearbyPlaces: Ref<Place[]> = ref([]);
  const exploredPlaces: Ref<Place[]> = ref([]);

  const setupLocalization = async () => {
    try {
      const permissionStatus = await Geolocation.checkPermissions();
      if (permissionStatus.location != 'granted') {
        const requestStatus = await Geolocation.requestPermissions();
        if (requestStatus.location != 'granted') {
          localization.value = null;
          throw new Error();
        }
      }

      const options: PositionOptions = {
        timeout: 100,
        enableHighAccuracy: true,
      };

      const introLocation = await Geolocation.getCurrentPosition();

      // Set location for the first time to avoid null value
      localization.value = {
        geoWidth: introLocation.coords.latitude,
        geoHeight: introLocation.coords.longitude,
      };

      Geolocation.watchPosition(options, (position) => {
        const pos = position as Position;
        localization.value = {
          geoWidth: pos.coords.latitude,
          geoHeight: pos.coords.longitude,
        };
      });
    } catch (err) {
      console.error('Please enable localization!');
    }
  };

  /** Load nearby places  */
  const loadNearbyPlaces = async (): Promise<void> => {
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
  const loadExploredPlaces = async (): Promise<void> => {
    if (userStore.user) {
      const result = await getExploredPlaces(userStore.user, userStore.token);
      exploredPlaces.value = result;
    }
  };

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
    localization,
    selectedCategory,
    selectedDistance,
    nearbyPlaces,
    exploredPlaces,
    loadNearbyPlaces,
    loadExploredPlaces,
    getDistance,
    setupLocalization,
  };
});
