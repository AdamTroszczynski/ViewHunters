<template>
  <IonPage>
    <HeroBanner :is-logged="false" />
    <div class="loginView">
      <MainForm @on-submit="loginAction()">
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
import { IonPage, useIonRouter } from '@ionic/vue';
import { YupSchema, useForm } from 'vee-validate';
import { object, string } from 'yup';
import type { LoginForm } from '@/types/commonTypes';
import { login } from '@/services/userServices';
import { useUserStore } from '@/stores/userStore';
import { forwardAnimation } from '@/animations/navigateAnimations';

import HeroBanner from '@/components/common/HeroBanner.vue';
import MainInput from '@/components/inputs/MainInput.vue';
import MainForm from '@/components/layout/MainForm.vue';
import ActionButton from '@/components/buttons/ActionButton.vue';

const router = useIonRouter();
const userStore = useUserStore();

/** Login schema with all validation rules */
const loginSchema: YupSchema = object({
  username: string().required('Please enter a username'),
  password: string().required('Please enter a password'),
});

/** Use validationSchema to LoginForm */
const { validate, meta, values, setFieldError } = useForm<LoginForm>({
  validationSchema: loginSchema,
});

/** Login user action with error handling */
const loginAction = async (): Promise<void> => {
  try {
    validate();
    if (meta.value.valid) {
      const { username, password } = values;
      const result = await login(username, password);
      const { user, token } = result;
      userStore.login(user, token);
      router.navigate('/', 'root', 'push', forwardAnimation);
    }
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { errorMsg } = error.response.data;
      setFieldError('password', errorMsg);
    }
  }
};

/** Go to register view */
const goToRegister = (): void => {
  router.navigate('/register', 'forward', 'push', forwardAnimation);
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

  &__error {
    text-align: center;
    color: #ff6262;
    font-family: $poppins;
    font-size: 0.85rem;
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
