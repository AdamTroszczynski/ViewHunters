<template>
  <IonPage>
    <div class="registerView">
      <MainForm @on-submit="registerAction()">
        <template #title>Create Account</template>
        <template #inputs>
          <MainInput
            :name="'username'"
            :type="'text'"
            :placeholder="'Username'"
          ></MainInput>
          <MainInput
            :name="'email'"
            :type="'email'"
            :placeholder="'Email'"
          ></MainInput>
          <MainInput
            :name="'password'"
            :type="'password'"
            :placeholder="'Password'"
          ></MainInput>
          <MainInput
            :name="'passwordRepeat'"
            :type="'password'"
            :placeholder="'Repeat password'"
          ></MainInput>
        </template>
        <template #button>Create account</template>
      </MainForm>
      <div class="registerView__info">
        <p class="registerView__text">Already have account?</p>
        <ActionButton
          class="registerView__btn"
          :icon="'check'"
          @click-action="goToLoginPage"
          >Login</ActionButton
        >
      </div>
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, useIonRouter } from '@ionic/vue';
import { object, string, ref as yupRef } from 'yup';
import { YupSchema, useForm } from 'vee-validate';
import type { RegisterForm } from '@/types/commonTypes';
import { register } from '@/services/userServices';
import { useUserStore } from '@/stores/userStore';
import {
  backAnimation,
  forwardAnimation,
} from '@/animations/navigateAnimations';

import ActionButton from '@/components/buttons/ActionButton.vue';
import MainInput from '@/components/inputs/MainInput.vue';
import MainForm from '@/components/layout/MainForm.vue';

const router = useIonRouter();
const userStore = useUserStore();

/** Login schema with all validation rules */
const loginSchema: YupSchema = object({
  username: string()
    .required('Please enter a username')
    .min(6, 'Username must be at least 6 characters'),
  email: string()
    .email('Email must be a valid email')
    .required('Please enter a email address'),
  password: string()
    .required('Please enter a password')
    .min(6, 'Password must be at least 6 characters'),
  passwordRepeat: string()
    .oneOf([yupRef('password')], 'Passwords must be identical')
    .required('Please enter a password'),
});

/** Use validationSchema to RegisterForm */
const { validate, meta, values, setFieldError } = useForm<RegisterForm>({
  validationSchema: loginSchema,
});

/** Register user action with error handling */
const registerAction = async (): Promise<void> => {
  try {
    validate();
    if (meta.value.valid) {
      const { username, email, password, passwordRepeat } = values;
      const result = await register(username, email, password, passwordRepeat);
      const { user, token } = result;
      userStore.login(user, token);
      router.navigate('/', 'root', 'push', forwardAnimation);
    }
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { errorMsg } = error.response.data;
      setFieldError('passwordRepeat', errorMsg);
    }
  }
};

/** Go to login view */
const goToLoginPage = (): void => {
  router.navigate('/login', 'back', 'pop', backAnimation);
};
</script>

<style lang="scss" scoped>
.registerView {
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
