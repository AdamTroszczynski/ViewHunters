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
        @click-action="checkCode"
        >Check</ActionButton
      >
      <ActionButton
        :icon="'code'"
        class="codeChecker__btn"
        @click-action="startScan"
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
import { Ref, onMounted, ref } from 'vue';
import jsQR from 'jsqr';

const router = useIonRouter();

const videoElement: Ref<HTMLVideoElement | null> = ref(null);
const canvasElement = ref();
const canvasContext = ref();
const scanActive = ref(false);
const scanResult: Ref<string> = ref('');

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

const codeSchema = object({
  code: string()
    .required('Please enter a code')
    .min(6, 'Username must be at least 6 characters'),
});

const { validate, meta, values, setFieldError } = useForm<{
  code: String;
}>({
  validationSchema: codeSchema,
});

const reset = () => (scanResult.value = '');
const stopScan = () => (scanActive.value = false);
const startScan = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' },
  });
  if (videoElement.value !== null) {
    videoElement.value.srcObject = stream;
    videoElement.value.play();
  } else {
    throw new Error('Video does not exist');
  }
  scanActive.value = true;
  requestAnimationFrame(scan);
};
const scan = async () => {
  if (
    videoElement.value !== null &&
    videoElement.value.readyState === videoElement.value.HAVE_ENOUGH_DATA
  ) {
    canvasElement.value.height = videoElement.value.videoHeight;
    canvasElement.value.width = videoElement.value.videoWidth;

    canvasContext.value.drawImage(
      videoElement.value,
      0,
      0,
      canvasElement.value.width,
      canvasElement.value.height,
    );
    const imageData = canvasContext.value.getImageData(
      0,
      0,
      canvasElement.value.width,
      canvasElement.value.height,
    );
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });
    if (code) {
      scanActive.value = false;
      scanResult.value = code.data;
    } else {
      if (scanActive.value) {
        requestAnimationFrame(scan);
      }
    }
  } else {
    requestAnimationFrame(scan);
  }
};

const checkCode = async (): Promise<any> => {
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

onMounted(() => {
  canvasContext.value = canvasElement.value.getContext('2d');
});
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
