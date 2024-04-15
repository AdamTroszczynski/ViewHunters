<template>
  <IonHeader class="heroBanner" :translucent="true">
    <IonToolbar class="heroBanner__toolbar">
      <IonButtons
        v-if="isLogged"
        slot="end"
        class="heroBanner__buttonsContainer"
      >
        <IconButton :icon="'github'" @click-action="openSource"></IconButton>
        <IconButton :icon="'exit'" @click-action="logout"></IconButton>
      </IonButtons>

      <IonTitle
        class="heroBanner__title"
        :class="isLogged ? 'heroBanner__title--is-logged' : ''"
      >
        <span class="heroBanner__highlightText">View</span>
        Hunters
      </IonTitle>
    </IonToolbar>
  </IonHeader>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonButtons } from '@ionic/vue';
import IconButton from '@/components/buttons/IconButton.vue';

defineProps({
  isLogged: {
    type: Boolean,
    default: true,
  },
});

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
    column-gap: 8px;
  }

  &__title {
    padding: 0;
    margin-right: 0px;

    font-family: $poppins;
    font-size: 1.5625rem;
    font-weight: bold;
    color: $mediumGray;
    text-align: center;

    &--is-logged {
      margin-right: 15px;
    }
  }

  &__highlightText {
    color: $cyan;
  }
}
</style>
