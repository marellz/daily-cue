import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import { useToastsStore } from "@/store/toasts";
import type { AuthResponse } from "@supabase/supabase-js";

export interface User {
  id: string;
  avatar: string | null;
  created_at: string;
  email: string;
  name: string | null;
  other_names: string | null;
}

export const useAuthStore = defineStore(
  "auth",
  () => {
    const supabase = useSupabaseClient();

    const user = ref<User | null>(null);

    const isAuthenticated = computed(() => user.value !== null);
    const loading = ref(false);
    const router = useRouter();

    const errors = ref<{
      email?: string | undefined;
      password?: string | undefined;
    }>({});

    const hasErrors = computed(() => Object.keys(errors.value).length > 0);

    const toasts = useToastsStore();

    const getAuthUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    };

    const getUser = async () => {
      const authUser = await getAuthUser();
      if (!authUser) {
        return false;
      }

      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id);
        if (data?.length) {
          user.value = data[0];
        }
        if (error) {
          handleAuthError(error.message);
        }

        return null;
      } catch (error) {
        handleAuthError(error);
      }
    };

    const login = async (form: { email: string; password: string }) => {
      loading.value = true;
      errors.value = {};
      try {
        const { data, error }: AuthResponse =
          await supabase.auth.signInWithPassword(form);

        if (error) {
          handleAuthError(error);
        }

        if (data.user) {
          handleSessionCreation();
        }
      } catch (error) {
        handleAuthError(error);
      } finally {
        loading.value = false;
      }
    };

    const register = async (user: { email: string; password: string }) => {
      loading.value = true;
      errors.value = {};
      try {
        const {
          data: { session, user: _user },
          error,
        }: AuthResponse = await supabase.auth.signUp({
          email: user.email,
          password: user.password,
        });

        if (error) {
          handleAuthError(error);
        }

        if (session) {
          handleSessionCreation();

          return true;
        }

        return false;
      } catch (error) {
        handleAuthError(error);
      } finally {
        loading.value = false;
      }
    };

    const updateUser = async (payload: User) => {
      if (!user.value) {
        return;
      }

      try {
        const { status, error } = await supabase
          .from("users")
          .update(payload)
          .eq("id", user.value.id);
        if (error) {
          handleAuthError(error.message);
        }

        if (status === 204) {
          user.value = { ...user.value, ...payload };
        }
      } catch (error) {}
    };

    const logout = async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        handleAuthError(error);
      }

      user.value = null;

      router.push("/");
    };

    const resetPassword = async (email: string) => {
      loading.value = true;
      errors.value = {};
      try {
        const url = import.meta.env.VITE_APP_URL;
        const { data, error } = await supabase.auth.resetPasswordForEmail(
          email,
          {
            redirectTo: `${url}/update-password`,
          }
        );

        if (error) {
          handleAuthError(error);
          return false;
        } else if (data) {
          return true;
        }
      } catch (error) {
        handleAuthError(error);
      } finally {
        loading.value = false;
      }
    };

    const updatePassword = async (new_password: string) => {
      loading.value = true;
      errors.value = {};

      try {
        const { data, error } = await supabase.auth.updateUser({
          password: new_password,
        });

        if (error) {
          handleAuthError(error);
          return;
        }

        if (data) {
          toasts.addSuccess(
            "Password reset",
            "Your password has been successfully updated!"
          );
          return true;
        }

        return false;
      } catch (error) {
        handleAuthError(error);
        return false;
      } finally {
        loading.value = false;
      }
    };

    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          handleAuthError(error);
        }

        if (data.session) {
          return true;
        }

        return false;
      } catch (error) {
        handleAuthError(error);
        return false;
      }
    };

    const handleAuthError = (error: any) => {
      if (typeof error === "object" && error.message) {
        errors.value.email = error.message;
        toasts.addError("Auth error", error.message);
      }
      console.error({ authError: error });
    };

    const handleSessionCreation = async () => {
      await getUser();
      router.push("/tasks");
    };

    const resetErrors = () => {
      errors.value = {};
    };

    return {
      user,
      getUser,
      updateUser,
      isAuthenticated,
      hasErrors,
      loading,
      login,
      register,
      logout,
      resetPassword,
      updatePassword,

      //
      getSession,

      //
      errors,
      resetErrors,
    };
  },
  {
    persist: {
      pick: ["user"],
    },
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
