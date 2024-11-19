<template>
  <form @submit.prevent="update">
    <div class="space-y-3">
      <form-input label="Tag name" v-model="form.name"></form-input>
      <form-text label="Tag description" v-model="form.description"></form-text>
      <form-group label="Tag color">
        <div class="border rounded-xl p-3">
          <ul class="flex gap-2">
            <li v-for="(color, key) in TagColors" :key>
              <input
                type="radio"
                :id="`color-${key}`"
                :value="key"
                v-model="form.color"
                class="h-0 w-0 absolute"
              />
              <label
                :for="`color-${key}`"
                class="block rounded p-2 border border-transparent"
                :class="{ 'border-slate-300 bg-slate-100': key === form.color }"
              >
                <span class="h-5 w-5 block rounded" :class="color"></span>
              </label>
            </li>
          </ul>
        </div>
      </form-group>
      <div class="flex space-x-3">
        <base-button type="submit" class="btn-primary">
          <Check />
          <span>Save tag</span></base-button
        >
        <base-button type="reset" @click="$emit('cancel')">Cancel</base-button>
      </div>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { Check } from "lucide-vue-next";
import { TagColors, type Tag } from "~/types/tag";

const props = defineProps<{
  tag?: Tag;
}>();

const newTag = {
  name: "",
  description: "",
  color: null,
};

const form = ref(props.tag ?? newTag);

const emit = defineEmits(["submit", "cancel"]);

const update = () => {
  emit("submit", form.value);
};
</script>
