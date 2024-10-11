import authStore from "store/authStore";

const useAuth = () => {
  return {
    isAuthenticated: authStore.isAuthenticated,
    login: authStore.login.bind(authStore),
    logout: authStore.logout.bind(authStore),
    register: authStore.register.bind(authStore),
  };
};

export { useAuth };