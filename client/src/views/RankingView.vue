<template>
  <IonPage>
    <div class="rankingView">
      <HeroBanner />
      <div class="rankingView__container">
        <div class="rankingView__listWrapper">
          <TitleLabel class="rankingView__title">Ranking</TitleLabel>
          <IonList class="rankingView__scoresList">
            <div class="rankingView__tableHeader">
              <div
                class="rankingView__columnHeading rankingView__columnHeading--left"
              >
                Rank
              </div>
              <div
                class="rankingView__columnHeading rankingView__columnHeading--middle"
              >
                Username
              </div>
              <div
                class="rankingView__columnHeading rankingView__columnHeading--right"
              >
                Places
              </div>
            </div>
            <TransitionGroup name="list">
              <SingleRankingCard
                v-for="(score, index) in scores"
                :key="score.username"
                :rank="index + 1"
                :username="score.username"
                :views-count="score.viewsCount"
              />
            </TransitionGroup>
          </IonList>
        </div>
        <ActionButton
          :icon="'arrow'"
          class="rankingView__btn"
          @click-action="goBack()"
        >
          Back
        </ActionButton>
      </div>
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { IonPage, IonList, useIonRouter } from '@ionic/vue';
import { backAnimation } from '@/animations/navigateAnimations';
import type { RankingScore } from '@/types/commonTypes';
import { getRankingsScores } from '@/services/userServices';
import { useUserStore } from '@/stores/userStore';

import HeroBanner from '@/components/common/HeroBanner.vue';
import ActionButton from '@/components/buttons/ActionButton.vue';
import TitleLabel from '@/components/labels/TitleLabel.vue';
import SingleRankingCard from '@/components/cards/SingleRankingCard.vue';

const router = useIonRouter();
const userStore = useUserStore();

/** Scores data */
const scores: Ref<RankingScore[]> = ref([]);

/** Choose where redirect */
const goBack = async (): Promise<void> => {
  if (router.canGoBack()) {
    router.back(backAnimation);
  } else {
    router.navigate('/nearby', 'root', 'pop', backAnimation);
  }
};

onMounted(async (): Promise<void> => {
  scores.value = await getRankingsScores(userStore.token);
});
</script>

<style lang="scss" scoped>
.rankingView {
  width: 100%;
  height: 100%;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    height: calc(100% - 94px);
    padding: 0px 20px 20px 20px;
  }

  &__listWrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
    flex: 1;

    margin-top: 30px;

    overflow: scroll;
  }

  &__scoresList {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0;

    background-color: transparent;
  }

  &__tableHeader {
    display: flex;
  }

  &__columnHeading {
    display: flex;
    justify-content: center;
    align-items: center;

    color: rgba($darkGray, 0.8);
    font-family: $poppins;
    font-size: 0.75rem;
    font-weight: 500;

    &--left {
      min-width: 50px;
    }

    &--middle {
      flex: 1;
    }

    &--right {
      min-width: 80px;
    }
  }

  &__btn {
    width: 88px;
    min-width: 88px;
  }

  ::-webkit-scrollbar {
    width: 0px;
  }
}
</style>
