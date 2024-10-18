// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/styles/app.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: "DailyCue",
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          api: "modern",
        },
      },
    },
  },
  modules: [
    "@nuxt/fonts",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "vue3-perfect-scrollbar/nuxt",
  ],
});
