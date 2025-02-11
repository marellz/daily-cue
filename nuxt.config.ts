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
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    redirectOptions:{
      login: '/auth/login',
      callback: '/tasks',
      exclude: ['/', '/test', '/auth/**']
    },
    types: './types/supabase.ts'
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
    "@nuxtjs/supabase",
    "pinia-plugin-persistedstate/nuxt",
    "vue3-perfect-scrollbar/nuxt",
  ],
});
