<template>
  <IonHeader>
    <IonToolbar color="primary">
      <IonTitle> Ionic QR Scanner </IonTitle>
    </IonToolbar>
  </IonHeader>

  <ion-content>
    <ion-button expand="full" @click="startScan"> Start scan </ion-button>

    <ion-button expand="full" color="warning" @click="reset">
      Reset
    </ion-button>

    <!-- Shows our camera stream -->
    <video ref="videoElement" width="100%" v-show="scanActive"></video>

    <!-- Used to render the camera stream images -->
    <canvas ref="canvasElement" hidden></canvas>

    <!-- Stop our scanner preview if active -->
    <ion-button expand="full" color="danger" @click="stopScan">
      Stop scan
    </ion-button>

    <ion-card v-if="scanResult !== null">
      <ion-card-header>
        <ion-card-title>QR Code</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        {{ scanResult }}
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>

<script setup lang="ts">
import jsQR from 'jsqr';
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/vue';
import { Ref, onBeforeUnmount, onMounted, ref } from 'vue';

const videoElement: Ref<any> = ref(null);

const canvasElement = ref();
const canvasContext = ref();

const scanActive = ref(false);
const scanResult: Ref<any> = ref(null);

const reset = () => (scanResult.value = null);
const stopScan = () => (scanActive.value = false);

const startScan = async () => {
  // Not working on iOS standalone mode!
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' },
  });
  videoElement.value.srcObject = stream;
  // Required for Safari
  videoElement.value.setAttribute('playsinline', true);

  videoElement.value.play();
  scanActive.value = true;
  requestAnimationFrame(scan);
};

const scan = async () => {
  if (videoElement.value.readyState === videoElement.value.HAVE_ENOUGH_DATA) {
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

onMounted(() => {
  canvasContext.value = canvasElement.value.getContext('2d');
});
</script>
