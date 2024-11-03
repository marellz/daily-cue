import { defineStore, acceptHMRUpdate } from "pinia";
import { useToastsStore } from "./toasts";

interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginForm {
  email: string;
  password: string;
}

interface RegistrationForm extends LoginForm {
  name: string;
  password_confirmation: string;
}

export const useAuthStore = defineStore(
  "auth",
  () => {
    const { $api } = useNuxtApp();
    const user = ref<User | null>();
    const token = ref()
    const loading = ref(false)
    const errors = ref<Array<{}>([])
    const toasts = useToastsStore()

    const handleAuthError = (error: string) => {
      toasts.addToast({
        title: 'Error during authentication',
        description: error,
      })
    }

    const login = async (payload: LoginForm) => {
      try {
        loading.value = true
        const { data, error, token: _token} = await $api.post('/auth/login', payload)
  
        if(error){
          handleAuthError(error.message)
          return
        } 
        
        if(data && _token){
          user.value = data
          token.value = _token

          toasts.addToast({
            title:'Auth successful!',
            description:"YOU can now have access to your tasks"
          })

          return true
        }
        
      } catch (error: {error: Message}) {
        handleAuthError(error.message)
      } 
      finally {
        loading.value = false
      }
    };

    const get = async () => {
      // user.value = data

      try {
        if(!user.value || !user.value.email){
          handleAuthError('User does not currently exist.')
          return false
        }
        const { data } = await $api.post('/auth/me', {email: user.email})
        if(data){

          return data
          
        }

      } catch (error) {
        handleAuthError(error)
      }
    }

    const register = async (payload: RegistrationForm) => {
       try {
         loading.value = true;
         const { data, error, token } = await $api.post("/auth/register", payload);

         if (error) {
           handleAuthError(error.message);
           return;
         }

         if (data && token) {
           token.value = token;
           user.value = data;

           return true;
         }
       } catch (error: { error: Message }) {
         handleAuthError(error.message);
       } finally {
         loading.value = false;
       }
    };

    const logout = async () => {
      user.value = null
      token.value = null

      toasts.addToast({
        title:"Successfully logged out!"
      })

      return true
    };

    watch(token, (v: string | null) => {
      $api.defaults.headers.common["Authorization"] = v;
    })

    const isAuthenticated = computed(() => user.value !== null)

    return {
      errors,
      user,
      get,
      login,
      register,
      logout,
      isAuthenticated,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
