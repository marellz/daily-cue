<template>
    <label class="flex items-center">
        <input
            type="checkbox"
            :value
            :required
            :disabled
            :name
            v-model="model"
            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
        />

        <div class="ml-1">
            <slot>
                <span v-if="label" class="ms-2 text-sm text-gray-600">
                    {{ label }}
                </span>
            </slot>
        </div>
    </label>
</template>
<script setup lang="ts">
import { watch } from 'vue';


const props = defineProps<{
    label?: string;
    name?: string;
    value?: any;
    required?: boolean;
    disabled?: boolean;
}>();

const emit = defineEmits(['change'])

const model = defineModel()

watch(model, (v) => {
    emit('change', v)
})
</script>
