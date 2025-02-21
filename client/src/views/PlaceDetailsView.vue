<template>
  <IonPage>
    <div class="placeDetails">
      <div v-if="loadedPlace !== null">
        <div class="placeDetails__photo">
          <PhotoGallery
            :photos="loadedPlace.photo"
            :place-id="loadedPlace.id"
          ></PhotoGallery>
        </div>
        <div class="placeDetails__header">
          <h2 class="placeDetails__title">{{ loadedPlace.name }}</h2>
          <div>
            <ActionButton
              :icon="'map'"
              class="placeDetails__btn"
              @click-action="() => (isModalOpen = true)"
              >Map</ActionButton
            >
            <ActionButton :icon="'location'" class="placeDetails__btn">{{
              `${placeStore.getDistance(loadedPlace).toFixed(3)}km`
            }}</ActionButton>
          </div>
        </div>
        <p class="placeDetails__text">{{ loadedPlace.description }}</p>
      </div>
      <ActionButton
        :icon="'arrow'"
        class="placeDetails__btn"
        @click-action="goBack()"
        >Back</ActionButton
      >
    </div>
    <IonModal
      :is-open="isModalOpen"
      class="placeDetails__modal"
      @did-present="setMap()"
      @did-dismiss="isModalOpen = false"
    >
      <div id="map" class="placeDetails__map"></div>
    </IonModal>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonModal, useIonRouter } from '@ionic/vue';
import { onBeforeMount, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import L from 'leaflet';
import type Place from '@/types/Place';
import { usePlaceStore } from '@/stores/placeStore';
import { useUserStore } from '@/stores/userStore';
import { getSinglePlace } from '@/services/placeServices';
import { backAnimation } from '@/animations/navigateAnimations';

import PhotoGallery from '@/widgets/PhotoGallery.vue';
import ActionButton from '@/components/buttons/ActionButton.vue';

const route = useRoute();
const router = useIonRouter();
const placeStore = usePlaceStore();
const userStore = useUserStore();

const loadedPlace: Ref<Place | null> = ref(null);

const isModalOpen = ref(false);
const map = ref();

/** Set map and marker to modal */
const setMap = (): void => {
  if (loadedPlace.value !== null) {
    map.value = L.map('map').setView(
      [loadedPlace.value.geoWidth, loadedPlace.value.geoHeight],
      18,
    );
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map.value);
    L.marker([loadedPlace.value.geoWidth, loadedPlace.value.geoHeight]).addTo(
      map.value,
    );
  }
};

/** Choose where redirect */
const goBack = async (): Promise<void> => {
  if (router.canGoBack()) {
    router.back(backAnimation);
  } else {
    router.navigate('/explored', 'root', 'pop', backAnimation);
  }
};

onBeforeMount(async () => {
  const placeId = Number(route.params.id);
  const place = await getSinglePlace(placeId, userStore.token);
  if (place !== undefined) {
    loadedPlace.value = place;
  } else {
    throw new Error('Place not found');
  }
});
</script>

<style lang="scss" scoped>
.placeDetails {
  height: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__photo {
    width: 100%;
    height: 183px;
    border-radius: 8px;
    background-size: cover;
    background-position: center;
  }

  &__modal {
    --height: auto;
    --border-radius: 8px;
    padding: 10px;
  }

  &__map {
    width: 100%;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 17px;
  }

  &__title {
    font-family: $poppins;
    font-weight: 500;
    font-size: 0.9375rem;
    color: #293b4f;
    margin: 0;
  }

  &__btn {
    width: 88px;
    min-width: 88px;
  }

  &__text {
    font-family: $poppins;
    font-weight: 500;
    font-size: 0.75rem;
    color: rgba(55, 65, 74, 0.6);
    margin-top: 34px;
  }
}
</style>
