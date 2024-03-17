<template>
  <IonTabs class="pageTabs">
    <IonRouterOutlet />
    <IonTabBar class="pageTabs__tabBar" slot="bottom">
      <IonTabButton class="pageTabs__tabButton" tab="home" href="/achievements">
        <StarIcon class="pageTabs__tabIcon" />
        <IonLabel class="pageTabs__tabLabel">Achievements</IonLabel>
      </IonTabButton>

      <IonTabButton class="pageTabs__tabButton" tab="radio" href="/profile">
        <ProfileIcon class="pageTabs__tabIcon" />
        <IonLabel class="pageTabs__tabLabel">Profile</IonLabel>
      </IonTabButton>

      <IonTabButton class="pageTabs__tabButton" tab="library" href="/nearby">
        <HomeIcon class="pageTabs__tabIcon" />
        <IonLabel class="pageTabs__tabLabel">Nearby</IonLabel>
      </IonTabButton>

      <IonTabButton class="pageTabs__tabButton" tab="search" href="/explored">
        <BookIcon class="pageTabs__tabIcon" />
        <IonLabel class="pageTabs__tabLabel">Explored</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
</template>

<script setup lang="ts">
import { IonTabs, IonTabBar, IonTabButton, IonLabel, IonRouterOutlet } from '@ionic/vue';
import BookIcon from '@/components/icons/tabIcons/BookIcon.vue';
import ProfileIcon from '@/components/icons/tabIcons/ProfileIcon.vue';
import StarIcon from '@/components/icons/tabIcons/StarIcon.vue';
import HomeIcon from '@/components/icons/tabIcons/HomeIcon.vue';
</script>

<style lang="scss" scoped>
.pageTabs {
  $self: &;

  &__tabBar {
    height: 70px;

    background-color: $white;
    border-top: 0;
    box-shadow: 0 -6px 12px rgba($mediumGray, 0.15);
  }

  &__tabButton {
    background-color: $white;

    &.tab-selected {
      background-color: $darkGray;

      #{ $self }__tabIcon {
        fill: $white;
      }

      #{ $self }__tabLabel {
        color: $white;
      }
    }
  }

  &__tabIcon {
    margin-bottom: 5px;

    fill: rgba($darkGray, 0.6);
  }

  &__tabLabel {
    font-family: $poppins;
    font-size: .625rem;
    color: rgba($darkGray, 0.6);
  }
}
</style>
