import { createRouter, createWebHistory } from '@ionic/vue-router';
import { useUserStore } from '@/stores/userStore';
import { usePlaceStore } from '@/stores/placeStore';
import { checkToken } from '@/services/userServices';
import { Storage } from '@ionic/storage';

import HomeView from '@/views/HomeView.vue';
import PlaceDetailsView from '@/views/PlaceDetailsView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import PlaceUnlockView from '@/views/PlaceUnlockView.vue';
import AchievementsView from '@/views/tabViews/AchievementsView.vue';
import ExploredView from '@/views/tabViews/ExploredView.vue';
import ProfileView from '@/views/tabViews/ProfileView.vue';
import NearbyView from '@/views/tabViews/NearbyView.vue';
import RankingView from '@/views/RankingView.vue';

/** Load places */
const nearbyBeforeEnterAction = async (): Promise<void> => {
  const placeStore = usePlaceStore();
  if (placeStore.nearbyPlaces.length === 0) {
    await placeStore.loadExploredPlaces();
    await placeStore.loadNearbyPlaces();
  }
};

/** Load achievements */
const achievementsBeforeEnterAction = async (): Promise<void> => {
  const userStore = useUserStore();
  await userStore.loadAchievements();
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'nearby' },
    },
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: 'nearby',
          name: 'nearby',
          beforeEnter: nearbyBeforeEnterAction,
          component: NearbyView,
        },
        {
          path: 'achievements',
          name: 'achievements',
          beforeEnter: achievementsBeforeEnterAction,
          component: AchievementsView,
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
        },
        {
          path: 'explored',
          name: 'explored',
          component: ExploredView,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { onlyWhenLogout: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { onlyWhenLogout: true },
    },
    {
      path: '/placeDetail/:id',
      name: 'placeDetail',
      component: PlaceDetailsView,
    },
    {
      path: '/placeUnlock/:id',
      name: 'placeUnlock',
      component: PlaceUnlockView,
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: RankingView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      redirect: { name: 'nearby' },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  if (!userStore.isLogged) {
    const storage = new Storage();
    await storage.create();
    const token = await storage.get('token');
    if (token !== null) {
      try {
        const response = await checkToken(token);
        userStore.login(response, token);
      } catch (err) {
        console.error(err);
      }
    }
  }
  if (userStore.isUserLoggedIn && !to.meta.onlyWhenLogout) {
    next();
  } else if (!userStore.isUserLoggedIn && to.meta.onlyWhenLogout) {
    next();
  } else if (userStore.isUserLoggedIn && to.meta.onlyWhenLogout) {
    next({ name: 'nearby' });
  } else {
    next({ name: 'login' });
  }
});

export default router;
