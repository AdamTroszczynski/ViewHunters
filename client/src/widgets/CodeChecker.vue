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
        id="open-modal"
        :icon="'code'"
        class="codeChecker__btn"
        @click-action="startScan"
        >Scan QR code</ActionButton
      >
    </div>
    <IonModal
      ref="modal"
      trigger="open-modal"
      class="codeChecker__modal"
      @did-dismiss="stopCamera"
    >
      <div v-show="!isLoaded" class="codeChecker__loader"></div>
      <div v-show="isLoaded">
        <video ref="videoElement" width="110%" :hidden="!scanActive"></video>
      </div>
    </IonModal>
    <canvas ref="canvasElement" hidden></canvas>
  </div>
</template>

<script setup lang="ts">
import { IonModal, useIonRouter } from '@ionic/vue';
import { Ref, onMounted, ref } from 'vue';
import { object, string } from 'yup';
import { YupSchema, useForm } from 'vee-validate';
import jsQR from 'jsqr';
import { unlockPlace } from '@/services/placeServices';
import { useUserStore } from '@/stores/userStore';
import { usePlaceStore } from '@/stores/placeStore';
import { forwardAnimation } from '@/animations/navigateAnimations';

import MainInput from '@/components/inputs/MainInput.vue';
import ActionButton from '@/components/buttons/ActionButton.vue';
import Place from '@/types/Place';

const router = useIonRouter();
const userStore = useUserStore();
const placeStore = usePlaceStore();
const modal = ref();

const videoElement: Ref<HTMLVideoElement | null> = ref(null);
const canvasElement: Ref<HTMLCanvasElement | null> = ref(null);
const canvasContext = ref();
const scanActive = ref(false);
const isLoaded = ref(false);

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

/** Code schema with all validation rules */
const codeSchema: YupSchema = object({
  code: string()
    .required('Please enter a code')
    .min(6, 'Code must be at least 6 characters'),
});

/** Use validationSchema to code */
const { validate, meta, values, setFieldError, setFieldValue } = useForm<{
  code: string;
}>({
  validationSchema: codeSchema,
});

/** Check if code is valid */
const checkCode = async (): Promise<any> => {
  try {
    await validate();
    if (meta.value.valid) {
      stopCamera();
      if (userStore.user && userStore.user.id) {
        const response = await unlockPlace(
          props.id,
          userStore.user.id,
          values.code,
          userStore.token,
        );
        const index = placeStore.nearbyPlaces.findIndex((place: Place) => {
          return place.id === props.id;
        });
        placeStore.exploredPlaces.push(placeStore.nearbyPlaces[index]);
        router.navigate(
          `/placeDetail/${response}`,
          'root',
          'replace',
          forwardAnimation,
        );
      }
    }
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { errorMsg } = error.response.data;
      setFieldError('code', errorMsg);
    }
  }
};

/** Set active when camera is ready */
const setActive = (): void => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 500);
};

/** Close all stream tracks after close modal */
const stopCamera = (): void => {
  scanActive.value = false;
  isLoaded.value = false;
  if (!(videoElement.value instanceof HTMLMediaElement)) return;
  const stream = (videoElement.value as HTMLMediaElement)
    .srcObject as MediaStream;
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    videoElement.value.srcObject = null;
  }
};

/** Start scanning after btn cliced */
const startScan = async (): Promise<void> => {
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
  setActive();
  requestAnimationFrame(scan);
};

/** Scan all frames */
const scan = async (): Promise<void> => {
  if (
    videoElement.value !== null &&
    canvasElement.value !== null &&
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
      setFieldValue('code', code.data);
      modal.value.$el.dismiss();
      checkCode();
    } else {
      if (scanActive.value) {
        requestAnimationFrame(scan);
      }
    }
  } else {
    requestAnimationFrame(scan);
  }
};

onMounted(() => {
  if (canvasElement.value !== null) {
    canvasContext.value = canvasElement.value.getContext('2d');
  } else {
    throw new Error('Canvas does not exist');
  }
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

  &__modal {
    --height: 290px;
    --border-radius: 8px;
    padding: 10px;
  }

  &__loader {
    position: absolute;
    top: 90%;
    height: 30px;
    aspect-ratio: 2;
    display: grid;
    background:
      radial-gradient(farthest-side, #000 15%, #0000 18%) 0 0/50% 100%,
      radial-gradient(50% 100% at 50% 160%, #fff 95%, #0000) 0 0 /50% 50%,
      radial-gradient(50% 100% at 50% -60%, #fff 95%, #0000) 0 100%/50% 50%;
    background-repeat: repeat-x;
    animation: l2 1.5s infinite linear;
  }
  @keyframes l2 {
    0%,
    15% {
      background-position:
        0 0,
        0 0,
        0 100%;
    }
    20%,
    40% {
      background-position:
        5px 0,
        0 0,
        0 100%;
    }
    45%,
    55% {
      background-position:
        0 0,
        0 0,
        0 100%;
    }
    60%,
    80% {
      background-position:
        -5px 0,
        0 0,
        0 100%;
    }
    85%,
    100% {
      background-position:
        0 0,
        0 0,
        0 100%;
    }
  }
}
</style>
