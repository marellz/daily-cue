<template>
  <div class="card">
    <p class="text-gray-600 mb-2">Your progress</p>
    <div class="flex items-center justify-between">
        <div class="text-3xl font-medium flex">
          <template v-if="positivity">
            <span class="mr-2"> You are doing great! </span>
            <smile :size="36"/>
          </template>
          <template v-else>
            <span class="mr-2">
                You are not doing great
            </span>
            <frown :size="36"/>
          </template>
        </div>
        <h1 class="text-[40px] text-green-400">
            +78%
        </h1>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Smile, Frown } from "lucide-vue-next";
const positivity = ref(true);
</script>
