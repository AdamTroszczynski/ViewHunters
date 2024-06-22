<template>
  <div
    class="singleRankingCard"
    :class="rank == 1 ? 'singleRankingCard--first' : ''"
  >
    <div
      class="singleRankingCard__dataField singleRankingCard__dataField--left"
    >
      {{ rank }}
    </div>

    <div
      class="singleRankingCard__dataField singleRankingCard__dataField--middle"
    >
      {{ username }}
    </div>

    <div
      class="singleRankingCard__dataField singleRankingCard__dataField--right"
    >
      {{ viewsCount }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  rank: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  viewsCount: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.singleRankingCard {
  $self: &;
  display: flex;
  align-items: center;

  height: 42px;
  padding: 4px 4px 4px 0;

  border-radius: 8px;
  background-color: $white;
  overflow: hidden;

  font-size: 0.75rem;

  &--first {
    background-color: $darkGray;
  }

  &__dataField {
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: $poppins;
    font-weight: 500;
    color: $darkGray;

    &--left {
      min-width: 50px;

      #{ $self }--first & {
        color: $cyan;
      }
    }

    &--middle {
      flex: 1;

      #{ $self }--first & {
        color: $white;
      }
    }

    &--right {
      min-width: 80px;
      height: 100%;

      background-color: $darkGray;
      border-radius: 4px;

      color: $white;

      #{ $self }--first & {
        background-color: $cyan;

        color: $darkGray;
      }
    }
  }
}
</style>
