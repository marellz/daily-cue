<template>
  <header class="border-b">
    <layout-container class="py-10">
      <div class="flex items-center space-x-10">
        <nuxt-link to="/">
          <base-logo />
        </nuxt-link>
  
        <ul class="flex space-x-4">
          <li v-for="({to, label}, index) in links" :key="index">
            <nuxt-link :to class="font-medium">{{ label }}</nuxt-link>
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
          Made by @<a
            class="text-blue-500"
            href="https://dave-njoroge.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            >Dave</a
          >
          with 🫀
        </p>
      </div>
    </layout-container>
  </footer>
</template>
<script lang="ts" setup>
const links = [
  {
    to:"/tasks",
    label: "Tasks"
  }
]
</script>
