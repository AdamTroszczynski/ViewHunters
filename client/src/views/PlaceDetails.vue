<template>
  <IonPage>
    <HeroBanner />
    <div class="placeDetails">
      <div v-if="loadedPlace !== null">
        <div
          class="placeDetails__photo"
          :style="`background-image: url(${loadedPlace.photo[0]})`"
        ></div>
        <div class="placeDetails__header">
          <h2 class="placeDetails__title">{{ loadedPlace.name }}</h2>
          <ActionButton :icon="'location'" class="placeDetails__locationBtn"
            >3.5 km</ActionButton
          >
        </div>
        <p class="placeDetails__text">{{ loadedPlace.description }}</p>
      </div>
      <ActionButton :icon="'arrow'" class="placeDetails__btn"
        >Back</ActionButton
      >
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import { onBeforeMount, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Place } from '@/types/Place';
import getPlaces from '@/testPlaces';
import HeroBanner from '@/components/common/HeroBanner.vue';
import ActionButton from '@/components/buttons/ActionButton.vue';

const route = useRoute();

const loadedPlace: Ref<Place | null> = ref(null);

onBeforeMount(() => {
  const placeId = Number(route.params.id);
  loadedPlace.value = getPlaces()[placeId - 1];
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

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }

  &__title {
    font-family: $poppins;
    font-weight: 500;
    font-size: 0.9375rem;
    color: #293b4f;
    margin: 0;
  }

  &__locationBtn {
    width: 88px;
  }

  &__text {
    font-family: $poppins;
    font-weight: 500;
    font-size: 0.75rem;
    color: rgba(55, 65, 74, 0.6);
  }

  &__btn {
    width: 79px;
  }
}
</style>
