import type {
  AuthResponse,
  User,
  UserAttributes,
} from "@supabase/supabase-js";
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import supabase from "@/services/supabase";
import { useToastsStore } from "@/store/toasts";

interface LoginForm {
  email: string;
  password: string;
}

interface NewUser {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref<User | null>(null);
    const token = ref<string | null>(null);
    const isAuthenticated = computed(
      () => user.value !== null
    );
    const loading = ref(false);
    const router = useRouter();

    const errors = ref<{
      email?: string | undefined;
      password?: string | undefined;
    }>({});

    const hasErrors = computed(() => Object.keys(errors.value).length > 0);

    const toasts = useToastsStore();

    const login = async (form: LoginForm) => {
      loading.value = true;
      errors.value = {};
      try {
        const { data, error }: AuthResponse =
          await supabase.auth.signInWithPassword(form);

        if (error) {
          handleAuthError(error);
        }

        if (data && data.session) {
          handleSessionCreation(data.session?.access_token, data.user);
        }
      } catch (error) {
        handleAuthError(error);
      } finally {
        loading.value = false;
      }
    };

    const register = async (user: NewUser) => {
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
          handleSessionCreation(session.access_token, _user);

          return true;
        }

        return false;
      } catch (error) {
        handleAuthError(error);
      } finally {
        loading.value = false;
      }
    };

    const updateUser = async (payload: UserAttributes) => {
      await supabase.auth.updateUser(payload);
    };

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        return;
      }
      user.value = data.user;
    
    };

    const logout = async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        handleAuthError(error);
      }

      token.value = null;
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

    const handleSessionCreation = async (
      _token: string,
      _user: User | null
    ) => {
      token.value = _token;

      if (!_user) {
        return;
      }

      user.value = _user;

      router.push("/");
    };

    const resetErrors = () => {
      errors.value = {};
    };

  
    return {
      user,
      getUser,
      updateUser,
      isAuthenticated,
      token,
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
      storage: sessionStorage,
      pick: ["authUser", "user"],
    },
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
