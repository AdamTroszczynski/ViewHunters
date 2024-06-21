<template>
  <IonPage class="rankingView">
    <HeroBanner />
    <div class="rankingView__container">
      <TitleLabel class="rankingView__title">Places Nearby</TitleLabel>
      <IonList>
        <TransitionGroup name="list">
          <IonItem>siema</IonItem>
        </TransitionGroup>
      </IonList>
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonList, IonItem } from '@ionic/vue';

import HeroBanner from '@/components/common/HeroBanner.vue';
import ActionButton from '@/components/buttons/ActionButton.vue';
import TitleLabel from '@/components/labels/TitleLabel.vue';
</script>

<style lang="scss" scoped>
.rankingView {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    height: calc(100% - 155px);
    padding: 0px 20px 20px 20px;
    overflow-y: scroll;
  }
}
</style>
