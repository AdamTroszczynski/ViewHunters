import { createRouter, createWebHistory } from '@ionic/vue-router';
import { useUserStore } from '@/stores/userStore';

import HomeView from '@/views/HomeView.vue';
import PlaceDetailsView from '@/views/PlaceDetailsView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import PlaceUnlockView from '@/views/PlaceUnlockView.vue';
import AchievementsView from '@/views/tabViews/AchievementsView.vue';
import ExploredView from '@/views/tabViews/ExploredView.vue';
import ProfileView from '@/views/tabViews/ProfileView.vue';
import NearbyView from '@/views/tabViews/NearbyView.vue';

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
          component: NearbyView,
        },
        {
          path: 'achievements',
          name: 'achievements',
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
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      redirect: { name: 'nearby' },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  // TODO: Logic to check if auth token exists on user device and login user automatically

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
