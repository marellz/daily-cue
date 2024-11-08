<template>
  <div
    class="fixed inset-0 z-50 bg-tea-green/25 backdrop-blur-sm flex justify-center items-start pt-20 invisible"
    :class="{ '!visible': show }"
  >
    <div
      class="!p-0 relative z-10 w-full"
      :class="[width]"
      ref="modal"
    >
      <div class="p-3 rounded-t-xl pt-4 flex items-center bg-slate-100">
        <slot name="header">
          <div class="flex-auto">
            <h1 class="text-2xl font-bold">{{ title }}</h1>
          </div>
        </slot>
        <button type="button" class="p-1 bg-slate-200 rounded-full hover:bg-black hover:text-white" @click="close">
          <x :size="20" />
        </button>
      </div>
      <div class="p-3 bg-white rounded-b-xl">
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
