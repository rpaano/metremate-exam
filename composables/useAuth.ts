import { ref } from 'vue';
import { useCookie, useRuntimeConfig } from '#imports';

export const useAuth = () => {
  const user = ref<TODO>(null);
  const token = useCookie<TODO>('auth_token');

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const { token: authToken, user: authUser } = await $fetch<TODO>(`/api/auth/login`, 
        {
          method: 'POST',
          body: credentials,
        }
      );
      token.value = authToken;
      user.value = authUser;

      return user;
    } catch (error) {
      console.error("Failed to fetch auth token:", error);
    }
  };

  const logout = async () => {
    try {
      await $fetch(`/api/auth/logout`, { method: 'POST' });
      navigateTo('login')
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      token.value = null;
      user.value = null;
    }
  };

  return {
    user,
    login,
    logout,
    isAuthenticated: computed(() => !!token.value),
  };
};
