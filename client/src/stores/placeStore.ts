import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const usePlaceStore = defineStore('placeStore', () => {
  const selectedCategory: Ref<string> = ref('Buildings');
  const selectedDistanse: Ref<number> = ref(5);

  return { selectedCategory, selectedDistanse };
});
