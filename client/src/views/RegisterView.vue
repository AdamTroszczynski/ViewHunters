<template>
  <IonPage>
    <HeroBanner :is-logged="false" />
    <div class="registerView">
      <MainForm @on-submit="register()">
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
    </div>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue';
import { useForm } from 'vee-validate';
import { object, string, ref as yupRef } from 'yup';
import type { RegisterForm } from '@/types/commonTypes';
import HeroBanner from '@/components/common/HeroBanner.vue';
import MainInput from '@/components/inputs/MainInput.vue';
import MainForm from '@/components/layout/MainForm.vue';

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
const register = (): void => {
  try {
    validate();
    if (meta.value.valid) {
      console.log(
        values.username,
        values.email,
        values.password,
        values.passwordRepeat,
      );
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.registerView {
  height: 100%;
  width: 100%;
  padding: 1.6rem 1.25rem 1.25rem 1.25rem;
}
</style>
