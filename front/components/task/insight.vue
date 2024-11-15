<template>
  <div class="py-10 px-5">
    <h1 class="text-[60px] leading-[70px] font-bold">
      Don't worry, you're doing ok.
    </h1>

    <div class="mt-10 max-w-lg space-y-3">
      <h1 class="text-2xl font-medium">This feature is coming soon.</h1>
      <!-- <stats-overdue v-if="overdue" :count="overdue" />
      <stats-current v-if="current" v-bind="{ current, urgent }" /> -->
      <!-- <stats-progress v-bind="{ growth }" /> -->

      <div class="flex justify-center py-10">
        <base-button @click="close">
          <span>Close</span>
        </base-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const close = () => {};
</script>
