import { createRouter, createWebHistory } from '@ionic/vue-router';

import HomeView from '@/views/HomeView.vue';
import TestView from '@/views/TestView.vue';

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
      path: '/test',
      name: 'test',
      component: TestView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      redirect: { name: 'nearby' },
    },
  ],
});

export default router;
