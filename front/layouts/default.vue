<template>
  <toast-wrapper />
  <header>
    <layout-container class="pt-10">
      <div class="flex items-center justify-center space-x-10">
        <ul class="flex border border-slate-400 rounded-full px-4">
          <li v-for="({ to, label }, index) in links" :key="index">
            <nuxt-link :to class="font-medium py-2 px-4 block text-slate-400 hover:text-black"
              exact-active-class="!text-black">{{ label }}</nuxt-link>
          </li>
        </ul>
      </div>
    </layout-container>
  </header>
  <main class="flex-auto my-10">
    <slot />
  </main>
  <footer class="bg-gray-900 text-white py-4">
    <layout-container>
      <div class="flex items-center space-x-10">
        <base-logo />
        <p>
          Made by @<a class="text-blue-500" href="https://dave-njoroge.vercel.app" target="_blank"
            rel="noopener noreferrer">Dave</a>
          with 🫀
        </p>
      </div>
    </layout-container>
  </footer>
</template>
<script lang="ts" setup>
const links = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/tasks",
    label: "Tasks",
  },
];
const route = useRoute()
const activeRoute = computed(() => route.path)
</script>
