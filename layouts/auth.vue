<template>
  <toast-wrapper />
  <div class="flex justify-center py-20">
    <div class="auth-bg h-full absolute inset-0 bg-slate-200 opacity-50"></div>
    <div class="w-full card bg-white max-w-lg relative z-10">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.auth-bg {
  background-image: radial-gradient(
    rgba(black, 0.2) 1px,
    rgba(black, 0.02) 1px
  );
  background-size: 20px 20px;
}
</style>
