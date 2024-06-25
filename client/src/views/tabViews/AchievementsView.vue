<template>
  <IonPage>
    <div class="achievementsView">
      <div class="achievementsView__container">
        <TitleLabel class="achievementsView__title">Achievements</TitleLabel>
        <div class="achievementsView__achievementsWrapper">
          <AchievCard
            v-for="achievement in userStore.achievements"
            :key="achievement.id"
          >
            {{ achievement.value }}
          </AchievCard>
        </div>
      </div>
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import { useUserStore } from '@/stores/userStore';

import TitleLabel from '@/components/labels/TitleLabel.vue';
import AchievCard from '@/components/cards/AchievCard.vue';

const userStore = useUserStore();
</script>

<style lang="scss" scoped>
.achievementsView {
  width: 100%;
  height: 100%;

  &__container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 0px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__title {
    margin-top: 30px;
  }

  &__achievementsWrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 17px;
  }
}

::-webkit-scrollbar {
  width: 0px;
}
</style>
