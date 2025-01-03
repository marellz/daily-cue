/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./composables/**/*.{js,ts}",
    "./data/**/*.{js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./store/**/*.{js,ts}",
    "./types/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    fontFamily: {
      sans: "Inter, sans-serif",
      monospace: "Kode Mono, monospace"
    },
    extend: {
      colors: {
        //https://coolors.co/114b5f-1a936f-88d498-c6dabf-f3e9d2-f0544f
        "midnight-green": "#114b5fff",
        "sea-green": "#1a936fff",
        celadon: "#88d498ff",
        "tea-green": "#c6dabfff",
        parchment: "#f3e9d2ff",

        //extra
        vermilion: "#f0544fff",
      },
    },
  },
  plugins: [],
};
