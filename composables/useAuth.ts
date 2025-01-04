import { ref } from 'vue';
import { useCookie } from '#imports';

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

  const fetchUser = async () => {
    try {
      if (!token.value) return null;
      const data = await $fetch(`/api/auth/user`, {
        headers: { Authorization: `Bearer ${token.value}` },
      });
      user.value = data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      logout();
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
    fetchUser,
    logout,
    isAuthenticated: computed(() => !!token.value),
  };
};
