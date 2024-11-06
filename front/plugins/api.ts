import axios from "axios";
import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const baseURL = config.public.API_URL;

  const api = axios.create({
    baseURL,
    timeout: 60000,
    headers: {
      common: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  });

  api.interceptors.request.use(
    function (config) {
      // todo: get token from vue and use
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error) {
      // todo: handle errors, somwehow
      const status = error.response.status
      switch(status){
        case 401:
          useAuthStore().logout()
          useRouter().push('/')
      }
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      api: api,
    },
  };
});
