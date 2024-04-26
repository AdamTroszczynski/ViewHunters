<template>
  <IonPage>
    <HeroBanner :is-logged="false" />
    <div class="loginView">
      <MainForm @on-submit="login()">
        <template #title>Login</template>
        <template #inputs>
          <MainInput
            :name="'username'"
            :type="'text'"
            :placeholder="'Username'"
          ></MainInput>
          <MainInput
            :name="'password'"
            :type="'password'"
            :placeholder="'Password'"
          ></MainInput>
        </template>
        <template #button>Login</template>
      </MainForm>
      <div class="loginView__info">
        <p class="loginView__text">Doesn't have account?</p>
        <ActionButton
          class="loginView__btn"
          :icon="'check'"
          @click-action="goToRegister"
          >Create account</ActionButton
        >
      </div>
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import type { LoginForm } from '@/types/commonTypes';
import { useIonRouter } from '@ionic/vue';
import { forwardAnimation } from '@/animations/navigateAnimations';
import HeroBanner from '@/components/common/HeroBanner.vue';
import MainInput from '@/components/inputs/MainInput.vue';
import MainForm from '@/components/layout/MainForm.vue';
import ActionButton from '@/components/buttons/ActionButton.vue';

const router = useIonRouter();

/** Login schema with all validation rules */
const loginSchema = object({
  username: string()
    .required('Please enter a username')
    .min(6, 'Username must be at least 6 characters'),
  password: string()
    .required('Please enter a password')
    .min(6, 'Password must be at least 6 characters'),
});

const { validate, meta, values } = useForm<LoginForm>({
  validationSchema: loginSchema,
});

/** Go to register view */
const goToRegister = (): void => {
  router.navigate('/register', 'forward', 'push', forwardAnimation);
};

/** Login user */
const login = (): void => {
  try {
    validate();
    if (meta.value.valid) {
      console.log(values.username, values.password);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.loginView {
  height: 100%;
  width: 100%;
  padding: 1.6rem 1.25rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__text {
    margin: 0px;
    font-weight: 500;
    font-size: 0.75rem;
    font-family: $poppins;
    color: rgba(41, 59, 79, 0.4);
  }

  &__btn {
    min-width: 0px;
    width: 190px;
  }
}
</style>
