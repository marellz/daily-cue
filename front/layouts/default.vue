<template>
  <header class="border-b">
    <layout-container class="py-10">
      <nuxt-link to="/">
        <base-logo />
      </nuxt-link>
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
<script lang="ts" setup></script>
