<template>
  <IonPage>
    <HeroBanner />
    <div class="placeUnlock">
      <div v-if="loadedPlace !== null">
        <div
          class="placeUnlock__photo"
          :style="`background-image: url(${BASE_SERVER_URL}/api/asset/image/${loadedPlace.id}/${loadedPlace.photo[0]})`"
        ></div>
        <div class="placeUnlock__header">
          <h2 class="placeUnlock__title">{{ loadedPlace.name }}</h2>
          <!-- DODAĆ TUTAJ ZE STORA OBLICZANIE ODLEGŁOŚCI-->
          <ActionButton :icon="'location'" class="placeUnlock__btn"
            >{{
              placeStore.getDistance(loadedPlace).toFixed(2)
            }}
            km</ActionButton
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
import { Ref, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getSinglePlace } from '@/services/placeServices';
import type Place from '@/types/Place';
import { usePlaceStore } from '@/stores/placeStore';
import { useUserStore } from '@/stores/userStore';
import { backAnimation } from '@/animations/navigateAnimations';
import { BASE_SERVER_URL } from '@/const/commonConst';

import CodeChecker from '@/widgets/CodeChecker.vue';
import HeroBanner from '@/components/common/HeroBanner.vue';
import ActionButton from '@/components/buttons/ActionButton.vue';

const route = useRoute();
const router = useIonRouter();
const placeStore = usePlaceStore();
const userStore = useUserStore();

const loadedPlace: Ref<Place | null> = ref(null);

onBeforeMount(async () => {
  if (!placeStore.localization) await placeStore.loadLocalization();
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
