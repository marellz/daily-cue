<template>
  <div class="loader flex items-center justify-center" :class="[color]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-loader-circle"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  </div>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    color?: string;
  }>(),
  {
    color: "text-slate-200",
  }
);
</script>
<style lang="scss" scoped>
.loader {
  animation: loader 0.75s linear infinite;
}

@keyframes loader {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
}
</style>
