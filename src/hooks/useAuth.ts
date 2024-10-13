import { useEffect } from "react";
import authStore from "store/authStore";

const useAuth = () => {
  useEffect(() => {
    const email = localStorage.getItem("authEmail");
    if (email) {
      authStore.isAuthenticated = true;
      authStore.email = email;
    }
  }, [])
  return {
    isAuthenticated: authStore.isAuthenticated,
    email: authStore.email,
    login: authStore.login.bind(authStore),
    logout: authStore.logout.bind(authStore),
    register: authStore.register.bind(authStore),
  };
};

export { useAuth };