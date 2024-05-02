import { ref, type Ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type User from '@/types/User';
import { usePlaceStore } from '@/stores/placeStore';

export const useUserStore = defineStore('userStore', () => {
  const user: Ref<User | null> = ref(null);
  const token: Ref<string> = ref('');
  const isLogged: Ref<boolean> = ref(false);

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
  const login = (newUser: User, newToken: string): void => {
    user.value = newUser;
    token.value = newToken;
    // TODO: Add logic to store auth token on user device with some expiration time
    isLogged.value = true;
  };

  /** Logout user, reset all user data */
  const logout = (): void => {
    const placeStore = usePlaceStore();
    user.value = null;
    token.value = '';
    // TODO: Add logic to remove auth token from user device
    isLogged.value = false;
    placeStore.places = [];
  };

  return {
    user,
    token,
    isLogged,
    isUserLoggedIn,
    login,
    logout,
  };
});
