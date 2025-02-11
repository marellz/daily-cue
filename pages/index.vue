<template>
  <div>
    <layout-container>
      <div class="text-center py-10">
        <h1 class="text-[69px] font-bold animate-home" style="--order: 1">
          {{ greeting }}
        </h1>
        <template v-if="auth.isAuthenticated">
          <h1
            class="text-[39px] text-gray-800 font-light animate-home"
            style="--order: 2"
          >
            How are you liking DailyCue so far?
          </h1>
        </template>
        <template v-else>
          <h1
            class="text-[39px] text-gray-800 font-light animate-home"
            style="--order: 2"
          >
            Welcome to DailyCue. Your AI assisted task manager
          </h1>
        </template>
      </div>
    </layout-container>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";

definePageMeta({
  layout: "home",
});

const auth = useAuthStore();

const greeting = computed(() => {
  const username = auth.user ? auth.user.name : "stranger";
  return `Hello ${username}!`;
});
</script>
<style lang="scss">
.animate-home {
  animation: animate-home 0.5s linear both;
  animation-delay: calc(var(--order) * 400ms);
}

@keyframes animate-home {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
