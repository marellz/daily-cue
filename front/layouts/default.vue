<template>
  <toast-wrapper />
  <layout-header class="bg-tea-green/25" />
  <main class="flex-auto py-10 bg-tea-green/25">
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
</script>
