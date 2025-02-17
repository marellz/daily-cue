import { defineStore, acceptHMRUpdate } from "pinia";
import { useToastsStore } from "./toasts";
import type {
  User,
  LoginForm,
  RegistrationForm,
  LoginResponse,
  RegisterResponse,
  GetUserResponse,
} from "@/types/users";
import type { PasswordForm, UserForm } from "~/types/form";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const { $api } = useNuxtApp();
    const user = ref<User | null>(null);
    const token = ref();
    const loading = ref(false);
    const errors = ref<Array<string>>([]);
    const toasts = useToastsStore();

    const handleAuthError = (error: string) => {
      errors.value = [error];
      toasts.add({
        variant: "error",
        title: "Error during authentication",
        description: error,
      });
    };

    const login = async (payload: LoginForm) => {
      try {
        loading.value = true;
        const {
          data,
          error,
          token: _token,
        }: LoginResponse = await $api.post("/auth/login", payload);

        if (error) {
          handleAuthError(error);
          return;
        }

        if (data && _token) {
          user.value = data;
          token.value = _token;

          toasts.add({
            variant: "success",
            title: "Auth successful!",
            description: "YOU can now have access to your tasks",
          });

          return true;
        }
      } catch (error: any) {
        handleAuthError(error.response.data.error);
      } finally {
        loading.value = false;
      }
    };

    const get = async () => {
      try {
        if (!user.value || !user.value.email) {
          handleAuthError("User does not currently exist.");
          return false;
        }

        const { data }: GetUserResponse = await $api.post("/auth/me", {
          email: user.value.email,
        });

        if (data) {
          return data;
        }
      } catch (error: any) {
        handleAuthError(error);
      }
    };

    const register = async (payload: RegistrationForm) => {
      try {
        const { password, password_confirmation } = payload;
        if (password !== password_confirmation) {
          errors.value.push("Passwords do not match");
          return false;
        }

        loading.value = true;
        const {
          data,
          error,
          message,
          token: _token,
        }: RegisterResponse = await $api.post("/auth/register", payload);

        if (error) {
          handleAuthError(error);
          return;
        }

        if (data && _token) {
          token.value = _token;
          user.value = data;

          if (message) {
            toasts.add({
              variant: "success",
              title: "Success!",
              description: message,
            });
          }

          return true;
        }
      } catch (error: any) {
        handleAuthError(error.response.data.error);
      } finally {
        loading.value = false;
      }
    };

    const logout = async () => {
      user.value = null;
      token.value = null;

      toasts.add({
        variant: "success",
        title: "Successfully logged out!",
      });

      return true;
    };

    const updateUserInformation = async (form: UserForm) => {
      const {
        updated,
        error,
        message,
      }: { updated: boolean; error?: string; message?: string } =
        await $api.put("/user/profile", form);

      if (error) {
        toasts.add({
          variant: "error",
          title: error ?? "Error updating profile",
        });

        console.error({ error, message });
      }

      toasts.add({
        variant: "success",
        title: "Updated profile successfully!",
      });

      return updated
    };

    const updatePassword = async (form: PasswordForm) => {

      // todo: implement form validation for these actions
      try {
        const {
          updated,
          error,
          message,
        }: { updated: boolean; error?: string; message?: string } =
          await $api.put("/auth/password", form);
  
        if (error) {
          toasts.add({
            variant: "error",
            title: error ?? "Error updating password",
          });
  
          console.error({ error, message });
        }
  
        toasts.add({
          variant: "success",
          title: "Updated password successfully!",
        });
  
        return updated
        
      } catch (error: any) {
        toasts.add({
          variant: "error",
          title: error.response.data.error ?? "Error updating password",
        });
      }
    };

    const setToken = (value: string | null) => {
      $api.defaults.headers.common["Authorization"] = value;
    };

    watch(token, setToken);

    const isAuthenticated = computed(
      () => user.value !== null && user.value !== undefined
    );

    const firstName = computed(() =>
      isAuthenticated && user.value ? user.value.name.split(" ")[0] : null
    );

    const clearErrors = () => {
      errors.value = [];
    };

    return {
      errors,
      user,
      firstName,
      token,
      loading,
      get,
      login,
      register,
      logout,
      clearErrors,
      isAuthenticated,

      updateUserInformation,
      updatePassword,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
