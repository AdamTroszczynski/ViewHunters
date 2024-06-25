import { ref, type Ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { usePlaceStore } from '@/stores/placeStore';
import { Storage } from '@ionic/storage';
import type User from '@/types/User';
import type Achievement from '@/types/Achievement';
import { getAchievements } from '@/services/userServices';

export const useUserStore = defineStore('userStore', () => {
  const user: Ref<User | null> = ref(null);
  const token: Ref<string> = ref('');
  const isLogged: Ref<boolean> = ref(false);
  const achievements: Ref<Achievement[]> = ref([]);
  const storage = new Storage();

  /**
   * Check if user is logged in
   * @returns {boolean} True if user is correctly logged in
   */
  const isUserLoggedIn = computed<boolean>(() => {
    return isLogged.value && user.value !== null && token.value !== '';
  });

  /**
   * Login user
   * @param {User} newUser User data
   * @param {string} newToken Token
   */
  const login = async (newUser: User, newToken: string): Promise<void> => {
    user.value = newUser;
    token.value = newToken;
    saveToken(newToken);
    isLogged.value = true;
  };

  /** Logout user, reset all user data */
  const logout = (): void => {
    const placeStore = usePlaceStore();
    user.value = null;
    token.value = '';
    removeToken();
    isLogged.value = false;
    placeStore.nearbyPlaces = [];
    placeStore.exploredPlaces = [];
    achievements.value = [];
  };

  /** Save token to device storage
   * @param {string} token User's token
   */
  const saveToken = async (token: string): Promise<void> => {
    await storage.create();
    await storage.set('token', token);
  };

  /** Remove token from device storage */
  const removeToken = async (): Promise<void> => {
    await storage.create();
    await storage.remove('token');
  };

  /** Load user achievements */
  const loadAchievements = async (): Promise<void> => {
    achievements.value = await getAchievements(token.value, user.value!.id);
  };

  return {
    user,
    token,
    isLogged,
    isUserLoggedIn,
    achievements,
    login,
    logout,
    saveToken,
    loadAchievements,
  };
});
