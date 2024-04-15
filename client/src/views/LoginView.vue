<template>
  <IonPage>
    <HeroBanner />
    <div class="loginView">
      <div>
        <TitleLabel>Login</TitleLabel>
        <form class="loginView__form">
          <MainInput
            :name="'login'"
            :type="'text'"
            :placeholder="'Username'"
          ></MainInput>
          <MainInput
            :name="'password'"
            :type="'password'"
            :placeholder="'Password'"
          ></MainInput>
        </form>
      </div>
      <ActionButton :is-green="true" :icon="'check'">Login</ActionButton>
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import HeroBanner from '@/components/common/HeroBanner.vue';
import TitleLabel from '@/components/labels/TitleLabel.vue';
import MainInput from '@/components/inputs/MainInput.vue';
import ActionButton from '@/components/buttons/ActionButton.vue';
</script>

<style lang="scss" scoped>
.loginView {
  height: 100%;
  width: 100%;
  padding: 1.4rem 1.25rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__form {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>
