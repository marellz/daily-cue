<template>
  <div
    class="fixed inset-0 z-50 bg-white/50 backdrop-blur-sm flex justify-center items-start pt-20 invisible"
    :class="{ '!visible': show }"
  >
    <div
      class="card bg-white relative z-10 w-full"
      :class="[width]"
      ref="modal"
    >
      <div class="px-2 py-3 flex items-center">
        <slot name="header">
          <div class="flex-auto">
            <h1 class="text-4xl font-medium">{{ title }}</h1>
          </div>
        </slot>
        <button type="button" class="p-2" @click="close">
          <x />
        </button>
      </div>
      <div class="border-t px-2 py-5">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { X } from "lucide-vue-next";
import { onClickOutside } from "@vueuse/core";
withDefaults(
  defineProps<{
    title?: string;
    width?: string;
  }>(),
  {
    width: "max-w-xl",
  }
);

const show = defineModel('show', { default: false})
const close = () => {
  show.value = false
};
const modal = ref();
onClickOutside(modal, close);
</script>
