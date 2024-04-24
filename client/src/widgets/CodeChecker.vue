<template>
  <div class="codeChecker">
    <MainInput
      :name="'code'"
      :type="'text'"
      :placeholder="'Code from view special board ...'"
    />
    <div class="codeChecker__buttons">
      <ActionButton
        :icon="'check'"
        :is-green="true"
        class="codeChecker__btn"
        @click-action="check"
        >Check</ActionButton
      >
      <ActionButton :icon="'code'" class="codeChecker__btn"
        >Scan QR code</ActionButton
      >
      {{ values.code }}
    </div>
  </div>
</template>

<script setup lang="ts">
import MainInput from '@/components/inputs/MainInput.vue';
import ActionButton from '@/components/buttons/ActionButton.vue';
import { object, string } from 'yup';
import { useIonRouter } from '@ionic/vue';
import { useForm } from 'vee-validate';

const router = useIonRouter();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const loginSchema = object({
  code: string()
    .required('Please enter a code')
    .min(6, 'Username must be at least 6 characters'),
});

const { validate, meta, values, setFieldError } = useForm<{
  code: String;
}>({
  validationSchema: loginSchema,
});

const check = async (): Promise<any> => {
  try {
    await validate();
    if (meta.value.valid) {
      if (values.code !== props.code) {
        setFieldError('code', 'The code is invalid');
      } else {
        router.navigate(`/placeDetail/${props.id}`, 'none', 'replace');
      }
    }
  } catch (err) {
    console.log(err);
  }
};
</script>

<style lang="scss" scoped>
.codeChecker {
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  &__buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  &__btn {
    min-width: 0;
    width: 163px;
  }

  &__error {
    font-family: $poppins;
    font-weight: 500;
    font-size: 1rem;
    color: red;
    text-align: center;
  }
}
</style>
