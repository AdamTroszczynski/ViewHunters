<template>
  <IonCard class="achievCard">
    <AchievementIcon class="achievCard__icon" />
    <IonCardHeader class="achievCard__header">
      <IonCardTitle class="achievCard__title"> <slot></slot> </IonCardTitle>
    </IonCardHeader>
  </IonCard>
</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/vue';

import AchievementIcon from '@/components/icons/AchievementIcon.vue';
</script>

<style lang="scss" scoped>
.achievCard {
  --background: $white;
  width: 100px;
  height: 100px;
  text-align: center;
  padding-top: 1.4rem;
  border-radius: 8px;

  &__header {
    padding-top: 0.5rem;
  }

  &__title {
    font-family: $poppins;
    font-size: 0.75rem;
    font-weight: 500;
    color: #37414a;
  }
}
</style>
