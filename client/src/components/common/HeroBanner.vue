<template>
  <IonHeader class="heroBanner" :translucent="true">
    <IonToolbar class="heroBanner__toolbar">
      <IonButtons slot="end" class="heroBanner__buttonsContainer">
        <IonButton class="heroBanner__actionButton" @click="logout()">
          <ExitIcon class="heroBanner__actionButtonIcon" />
        </IonButton>
        <IonButton class="heroBanner__actionButton" @click="openSource()">
          <GithubIcon class="heroBanner__actionButtonIcon" />
        </IonButton>
      </IonButtons>

      <IonTitle class="heroBanner__title">
        <span class="heroBanner__highlightText">View</span>
        Hunters
      </IonTitle>
    </IonToolbar>
  </IonHeader>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from '@ionic/vue';
import ExitIcon from '@/components/icons/ExitIcon.vue';
import GithubIcon from '@/components/icons/GithubIcon.vue';

/** Logout user */
const logout = (): void => {
  console.log('Logout');
};

/** Open github source code */
const openSource = (): void => {
  console.log('Open Source');
};
</script>

<style lang="scss" scoped>
.heroBanner {
  box-shadow: 0 6px 12px rgba($mediumGray, 0.15);

  &__toolbar {
    padding: 29px 50px 27px;

    --background: $white;
    --min-height: auto;
  }

  &__buttonsContainer {
    column-gap: 5px;
  }

  &__actionButton {
    width: 29px;
    min-height: 29px;

    border: solid 1px $mediumGray;
    border-radius: 8px;
  }

  &__actionButtonIcon {
    min-width: 15px;
    height: auto;

    fill: $mediumGray;
  }

  &__title {
    padding: 0;
    margin-right: 20px;

    font-family: $poppins;
    font-size: 1.5625rem;
    font-weight: bold;
    color: $mediumGray;
    text-align: center;
  }

  &__highlightText {
    color: $cyan;
  }
}
</style>
