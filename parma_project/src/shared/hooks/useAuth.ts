import { useEffect } from "react";
import authStore from "../../store/authStore";

const useAuth = () => {
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      authStore.isAuthenticated = true;
      authStore.loginWithToken(token);
    }
  }, []);

  return {
    isAuthenticated: authStore.isAuthenticated,
    login: authStore.login.bind(authStore),
    logout: authStore.logout.bind(authStore),
    register: authStore.register.bind(authStore),
  };
};

export { useAuth };