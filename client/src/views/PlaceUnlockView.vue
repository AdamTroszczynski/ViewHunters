<template>
  <IonPage>
    <HeroBanner />
    <div class="placeUnlock">
      <div v-if="loadedPlace !== null">
        <div
          class="placeUnlock__photo"
          :style="`background-image: url(${loadedPlace.photo[0]})`"
        ></div>
        <div class="placeUnlock__header">
          <h2 class="placeUnlock__title">{{ loadedPlace.name }}</h2>
          <!-- DODAĆ TUTAJ ZE STORA OBLICZANIE ODLEGŁOŚCI-->
          <ActionButton :icon="'location'" class="placeUnlock__btn"
            >{{ store.getDistance(loadedPlace) }} km</ActionButton
          >
        </div>
        <CodeChecker :id="loadedPlace.id" />
      </div>
      <ActionButton
        :icon="'arrow'"
        class="placeUnlock__btn"
        @click-action="router.back(backAnimation)"
        >Back</ActionButton
      >
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, useIonRouter } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { usePlaceStore } from '@/stores/placeStore';
import { useUserStore } from '@/stores/userStore';
import { Ref, onBeforeMount, ref } from 'vue';
import { getSinglePlace } from '@/services/placeServices';
import { Place } from '@/types/Place';
import { backAnimation } from '@/animations/navigateAnimations';

import HeroBanner from '@/components/common/HeroBanner.vue';
import ActionButton from '@/components/buttons/ActionButton.vue';
import CodeChecker from '@/widgets/CodeChecker.vue';

const route = useRoute();
const router = useIonRouter();
const store = usePlaceStore();
const userStore = useUserStore();

const loadedPlace: Ref<Place | null> = ref(null);

onBeforeMount(async () => {
  const placeId = Number(route.params.id);
  loadedPlace.value = await getSinglePlace(placeId, userStore.token);
});
</script>

<style lang="scss" scoped>
.placeUnlock {
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
    margin-top: 17px;
    margin-bottom: 40px;
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
