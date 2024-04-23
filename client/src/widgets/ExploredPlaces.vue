<template>
  <IonList class="exploredPlaces">
    <IonItem
      class="exploredPlaces__item"
      v-for="place in filteredPlaces"
      :key="place.id"
    >
      <ExploredCard
        :label="place.name"
        :photo="place.photo"
        @click-action="test(place.id)"
      ></ExploredCard>
    </IonItem>
  </IonList>
</template>

<script setup lang="ts">
import { IonList, IonItem } from '@ionic/vue';
import { computed, onBeforeMount } from 'vue';
import { usePlaceStore } from '@/stores/placeStore';
import ExploredCard from '@/components/cards/ExploredCard.vue';
import { ExploredPlace } from '@/types/Place';

const store = usePlaceStore();

/**
 * Filter exploredPlaces based on selectedCategory
 * @returns {ExploredPlace[]}
 */
const filteredPlaces = computed<ExploredPlace[]>(() => {
  return store.exploredPlaces.filter(
    (el) => el.category === store.selectedCategory,
  );
});

const test = (id: number) => {
  console.log(id);
};

onBeforeMount(() => {
  store.loadExploredPlaces();
});
</script>

<style lang="scss" scoped>
.exploredPlaces {
  min-height: fit-content;
  padding: 0px;
  background: none;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__item {
    --inner-border-width: 0px;
    --width: 100%;
    --background: none;
    --border: none;
    --padding-start: 0px;
    --inner-padding-end: 0px;
  }
}
</style>
