<template>
    <label :for class="mb-1 block font-medium text-sm text-gray-700">
        <span v-if="value">{{ value }}</span>
        <span v-else><slot /></span>
    </label>
</template>

<script setup lang="ts">
defineProps<{
    value?: string;
    for?: string | undefined
}>();
</script>

