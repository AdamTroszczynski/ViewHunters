<template>
  <IonHeader
    class="heroBanner"
    :translucent="true"
    :class="isFilters ? 'heroBanner--is-filters' : ''"
  >
    <IonToolbar class="heroBanner__toolbar">
      <IonButtons
        v-if="isLogged"
        slot="end"
        class="heroBanner__buttonsContainer"
      >
        <IconButton :icon="'github'" @click-action="openSource"></IconButton>
        <IconButton :icon="'exit'" @click-action="logoutAction()"></IconButton>
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
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  useIonRouter,
} from '@ionic/vue';
import { useUserStore } from '@/stores/userStore';
import { backAnimation } from '@/animations/navigateAnimations';

import IconButton from '@/components/buttons/IconButton.vue';

const userStore = useUserStore();
const router = useIonRouter();

defineProps({
  isLogged: {
    type: Boolean,
    default: true,
  },
  isFilters: {
    type: Boolean,
    default: false,
  },
});

/** Logout user */
const logoutAction = (): void => {
  userStore.logout();
  router.navigate('/login', 'none', 'pop', backAnimation);
};

/** Open github source code */
const openSource = (): void => {
  window.location.replace('https://github.com/AdamTroszczynski/ViewHunters');
};
</script>

<style lang="scss" scoped>
.heroBanner {
  box-shadow: 0 6px 12px rgba($mediumGray, 0.15);

  &--is-filters {
    box-shadow: none;
    -webkit-box-shadow: none;
  }

  &__toolbar {
    padding: 29px 50px 27px;

    --background: white;
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
