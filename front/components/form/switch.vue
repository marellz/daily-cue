<template>
    <label class="form-switch">

        <input
            type="checkbox"
            :value
            :required
            :disabled
            :name
            role="switch"
            v-model="model"
            class=""
        />

        <div class="form-switch__indicator !ml-0"></div>

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

defineProps<{
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
