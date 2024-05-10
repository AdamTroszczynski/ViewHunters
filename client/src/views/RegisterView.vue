<template>
  <IonPage>
    <HeroBanner :is-logged="false" />
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
        <template #errorMessage>
          <div v-show="isBadRequest" class="loginView__error">
            {{ badRequestMessage }}
          </div>
        </template>
        <template #button>Create account</template>
      </MainForm>
      <div class="registerView__info">
        <p class="registerView__text">Already have account?</p>
        <ActionButton
          class="registerView__btn"
          :icon="'check'"
          @click-action="goToLogin"
          >Login</ActionButton
        >
      </div>
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import { useForm } from 'vee-validate';
import { object, string, ref as yupRef } from 'yup';
import type { RegisterForm } from '@/types/commonTypes';
import { register } from '@/services/userServices';
import { useIonRouter } from '@ionic/vue';
import { useUserStore } from '@/stores/userStore';
import {
  backAnimation,
  forwardAnimation,
} from '@/animations/navigateAnimations';
import ActionButton from '@/components/buttons/ActionButton.vue';
import HeroBanner from '@/components/common/HeroBanner.vue';
import MainInput from '@/components/inputs/MainInput.vue';
import MainForm from '@/components/layout/MainForm.vue';
import { AxiosError } from 'axios';
import { Ref, ref } from 'vue';

const router = useIonRouter();
const store = useUserStore();

const isBadRequest: Ref<boolean> = ref(false);
const badRequestMessage: Ref<string> = ref('');

/** Go to login view */
const goToLogin = (): void => {
  router.navigate('/login', 'back', 'pop', backAnimation);
};

/** Login schema with all validation rules */
const loginSchema = object({
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

const { validate, meta, values } = useForm<RegisterForm>({
  validationSchema: loginSchema,
});

/** Register user */
const registerAction = async (): Promise<void> => {
  try {
    validate();
    if (meta.value.valid) {
      const { username, email, password, passwordRepeat } = values;
      const result = await register(username, email, password, passwordRepeat);
      const { user, token } = result;
      store.login(user, token);
      router.navigate('/', 'root', 'push', forwardAnimation);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      isBadRequest.value = true;
      if (error.response && error.response.data) {
        const { errorMsg } = error.response.data;
        badRequestMessage.value = errorMsg;
      } else if (error.code === 'ECONNABORTED') {
        badRequestMessage.value = 'Server is not available';
      }
    }
  }
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
